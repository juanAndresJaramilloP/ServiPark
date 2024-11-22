'use server';

import { sql } from '@vercel/postgres';
import { Event, Incident, User, ParkingFee, ParkingFeeField, CardStats, InvoiceEvent, InvoiceDataState, InvoiceData } from './definitions';
import { formatPostgresInterval } from '@/app/lib/utils';
import { formatCurrency, formatTimestampToLocale, getCurrentLocalTimestampDate, calculateValueToPay } from '@/app/lib/utils';
import { z } from 'zod';


// MARK: - SCHEMAS

const carExitSchema = z.object({
    Placa: z.string({ required_error: "Debe ingresar una placa." }).max(6, { message: "La placa no debe tener más de 6 caracteres" }).min(4, { message: "La placa no debe tener menos de 4 caracteres" }),
});


// QUERIES RELACIONADAS AL ADMINISTRADOR:

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredEvents(query: string, currentPage: number, userID: string) {

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        // borrar promesa al final.. es solo para simular la carga de los datos
        console.log('DEBUG: Fetching events data...');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let data;
        if (query === '') {
            data = await sql<Event>`
            SELECT *
            FROM events
            WHERE user_id = ${userID}
            ORDER BY fecha_hora_ingreso DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
            `;
        } else {
            data = await sql<Event>`
            SELECT *
            FROM events
            WHERE placa ILIKE ${`%${query}%`} AND user_id = ${userID}
            ORDER BY fecha_hora_ingreso DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
            `;
        }

        console.log("DEBUG: Events data fetched successfully.", data.rows.length);

        // Convert `null` values to `undefined` for JSON compatibility
        // solves the following error: Error: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
        const formattedData = data.rows.map(event => ({
            ...event,
            transaction_id: event.transaction_id ?? undefined,
            duracion: formatPostgresInterval(event.duracion) ?? undefined,
            valor_base: event.valor_base ?? undefined,
            iva: event.iva ?? undefined,
            total: event.total ?? undefined,
        }));

        return formattedData;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch events.');
    }
}

export async function fetchEventsPages(query: string, userID: string) {
    try {
        let count;
        if (query === '') {
            count = await sql`SELECT COUNT(*)
            FROM events
            WHERE user_id = ${userID}
            `;
        } else {
            count = await sql`SELECT COUNT(*)
            FROM events
            WHERE
            placa ILIKE ${`%${query}%`} AND user_id = ${userID}
            `;
        }

        console.log('DEBUG: Total events:', count.rows[0].count);
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of events in the current work shift.');
    }
}


export async function fetchIncidents() {
    try {

        const data = await sql<Incident>`SELECT * FROM incidents`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchUsers() {
    try {

        const data = await sql<User>`SELECT * FROM users`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

const ITEMS_PER_PAGE_PARKING_FEES = 5;
export async function fetchParkingFees(query: string, currentPage: number) {
    try {

        const offset = (currentPage - 1) * ITEMS_PER_PAGE_PARKING_FEES;

        // borrar promesa al final.. es solo para simular la carga de los datos
        console.log('DEBUG: Fetching parking fee data...');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let data;
        if (query === '') {
            data = await sql<ParkingFee>`
            SELECT *
            FROM parking_fee
            ORDER BY vigencia_desde DESC
            LIMIT ${ITEMS_PER_PAGE_PARKING_FEES} OFFSET ${offset}
            `;
        } else {
            data = await sql<ParkingFee>`
            SELECT *
            FROM parking_fee
            WHERE nombre_tarifa ILIKE ${`%${query}%`}
            ORDER BY vigencia_desde DESC
            LIMIT ${ITEMS_PER_PAGE_PARKING_FEES} OFFSET ${offset}
            `;
        }

        console.log("DEBUG: Parking fee data fetched successfully.");

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch parkings fees.');
    }
}

export async function fetchParkingFeePages(query: string) {
    try {
        let count;
        if (query === '') {
            count = await sql`
            SELECT COUNT(*)
            FROM parking_fee
            `;
        } else {
            count = await sql`
            SELECT COUNT(*)
            FROM parking_fee
            WHERE
            nombre_tarifa ILIKE ${`%${query}%`}
            `;
        }

        console.log('DEBUG: Total parking fees:', count.rows[0].count);

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE_PARKING_FEES);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of parking fees.');
    }
}

export async function fetchActiveParkingFeesList() {

    try {

        const data = await sql<ParkingFeeField>`
        SELECT
        id,
        nombre_tarifa
        FROM parking_fee
        WHERE vigencia_desde <= NOW() AND vigencia_hasta >= NOW()
        ORDER BY vigencia_hasta DESC
        `;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Ocurrio un error al intentar obtener la lista de tarifas activas.');
    }

}

export async function fetchStatsCard(startDate: string, endDate: string) {
    try {

        console.log("DEBUG: startDate:", startDate, "endDate:", endDate);

        const data = await sql<CardStats>`
        SELECT 
        AVG(ocupacion_promedio) as ocupacion_promedio,
        AVG(tiempo_medio_duracion) as tiempo_medio_duracion,
        AVG(rotacion_espacios_prom_dia) as rotacion_espacios_prom_dia,
        AVG(porc_vehiculos_recurrentes) as porc_vehiculos_recurrentes
        FROM analytics
        WHERE aaaa_mm BETWEEN ${startDate} AND ${endDate}
        `;
        return data.rows[0];
    } catch (error) {
        console.error('The following error occured:', error);
        throw new Error('Failed to fetch statistics data.');
    }
}

export async function generateInvoiceForVehicle(formData: FormData): Promise<InvoiceDataState> {

    const rawFormData = Object.fromEntries(formData.entries())
    console.log('DEBUG: generateInvoiceForVehicle Form Data: ', rawFormData);

    // validate using zod
    const validatedFields = carExitSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        console.log("DEBUG validated Fields Errors: ", validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {

        // validate license plate exists in system and is active.
        const event = await sql<InvoiceEvent>`
        SELECT
        id,
        tarifa_id,
        fecha_hora_ingreso
        FROM events
        WHERE placa ILIKE ${validatedFields.data.Placa} AND fecha_hora_salida IS NULL
        `;

        if (event.rows.length === 0) {
            console.log('DEBUG: Vehicle not found in system.');
            return {
                errors: { Placa: [`El vehiculo con placa ${validatedFields.data.Placa.toUpperCase()} no se encuentra registrado en el sistema.`] },
            };
        } else if (event.rows.length > 1) {
            return {
                errors: { Placa: [`El vehiculo con placa ${validatedFields.data.Placa.toUpperCase()} tiene mas de una entrada activa. Por favor contacte al administrador.`] },
            };
        }

        // generate billing information.
        const event_id = event.rows[0].id;
        const tarifa_id = event.rows[0].tarifa_id;
        const fecha_hora_ingreso = event.rows[0].fecha_hora_ingreso;

        const fee = await sql<ParkingFee>`
        SELECT *
        FROM parking_fee
        WHERE id = ${tarifa_id}
        `;

        if (fee.rows.length === 0) {
            return {
                errors: { Placa: [`La tarifa del vehiculo con placa ${validatedFields.data.Placa.toUpperCase()} no se encuentra registrada en el sistema. Contacte al administrador.`] },
            };
        }

        const valorHora = Number(fee.rows[0].valor_hora);
        const incrementoPrimerHora = Number(fee.rows[0].incremento_primer_hora);
        const incrementoSegundaHora = Number(fee.rows[0].incremento_segunda_hora);
        const valorDia = Number(fee.rows[0].valor_dia);
        const primeraHora = Number(fee.rows[0].primera_hora_a_partir_minuto);
        const horaAdicional = Number(fee.rows[0].hora_adicional_a_partir_minuto);
        const cobrarDiaAPartirMin = Number(fee.rows[0].cobrar_valor_dia_a_partir_minuto);

        const nuevoDia = fee.rows[0].nuevo_dia;
        const nombreTarifa = fee.rows[0].nombre_tarifa;

        // calcular tiempo total de estadia en minutos
        const fechaHoraSalida = getCurrentLocalTimestampDate();
        const fechaHoraIngreso = formatTimestampToLocale(fecha_hora_ingreso);
        const tiempoEstadia = fechaHoraSalida.getTime() - fechaHoraIngreso.getTime();
        const minutosEstadia = Math.ceil(tiempoEstadia / 60000);

        // calcular valor a pagar
        // NUEVO_DIA_CALENDARIO" | "24_HORAS" | "12_HORAS"
        const valorTotal = calculateValueToPay(minutosEstadia, valorHora, incrementoPrimerHora, incrementoSegundaHora, valorDia, primeraHora, horaAdicional, cobrarDiaAPartirMin, nuevoDia);
        const formattedCurrency = formatCurrency(valorTotal);
        const placa = validatedFields.data.Placa;

        const invoiceData: InvoiceData = {
            fechaHoraIngreso: fechaHoraIngreso,
            fechaHoraSalida: fechaHoraSalida,
            formattedCurrency: formattedCurrency,
            nombreTarifa: nombreTarifa,
            placa: placa,
        }

        return {
            message: invoiceData,
        };

    } catch (error) {
        console.error('DEBUG: Error exiting vehicle:\n', error);
        return {
            errors: { Placa: ['Ocurrio un error al intentar registrar la salida del vehiculo. Por favor intentelo nuevamente.'] },
        };
    }

}

export async function fetchFilteredEmployees(query: string, currentPage: number) {

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {

        console.log('DEBUG: Fetching Users data...');

        let data;
        if (query === '') {
            data = await sql<User>`
            SELECT *
            FROM users
            ORDER BY nombre_usuario DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
            `;
        } else {
            data = await sql<User>`
            SELECT *
            FROM users
            WHERE nombre_usuario ILIKE ${`%${query}%`}
            ORDER BY nombre_usuario DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
            `;
        }

        console.log("DEBUG: Users data fetched successfully.", data.rows.length);

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch employees data.');
    }
}

export async function fetchEmployeePages(query: string) {
    try {
        let count;
        if (query === '') {
            count = await sql`SELECT COUNT(*)
            FROM users
            `;
        } else {
            count = await sql`SELECT COUNT(*)
            FROM users
            WHERE
            nombre_usuario ILIKE ${`%${query}%`}
            `;
        }

        console.log('DEBUG: Total users fetched:', count.rows[0].count);
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of users.');
    }
}

export async function fetchEmployeeById(id: string) {

    try {
        const data = await sql<User>`
            SELECT *
            FROM users
            WHERE id = ${id}
            `;

        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch employee data.');
    }
}




// EMPLOYEE RELATED QUERIES

// Fetch all vehicles for the current shift




// Fetch a vehicle by its plate number

// ADMIN RELATED QUERIES

// Consultar Ingresos por rango de fechas
// Consultar reportes financieros
// - Utilidad Bruta ultimos 5 años y ultimos 12 meses
// - Utilidad Neta ultimos 5 años y ultimos 12 meses
// - Gastos ultimos 5 años y ultimos 12 meses
// fetch statistics (Ocupacion Promedio, Tiempo Medio de duracion, Rotacion de espacios, % de vehiculos recurrentes,
// # tiquetes a perdida, participacion en los ingresos por tipo de vehiculo)