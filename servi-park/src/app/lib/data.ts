import { sql } from '@vercel/postgres';
import { Event, Incident, User, ParkingFee } from './definitions';
import { formatPostgresInterval } from '@/app/lib/utils';
import { Parser } from 'json2csv';

// QUERIES RELACIONADAS AL ADMINISTRADOR:

export async function downloadEventsCSV(startDate: string, endDate: string) {

    try {
        const events = await sql<Event>`
        SELECT
            id,
            placa,
            fecha_hora_ingreso,
            fecha_hora_salida,
            duracion,
            valor_base,
            iva,
            total,
            tipo_vehiculo,
            tiquete_perdido
        FROM events 
        WHERE fecha_hora_ingreso BETWEEN ${startDate} AND ${endDate}
        ORDER BY fecha_hora_ingreso DESC
        `;

        // Generate CSV using json2csv
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(events.rows);

        // Create a filename using the date range, e.g., historico_2023-01-01_to_2023-12-31.csv
        const filename = `historico_${startDate}_${endDate}.csv`;

    } catch (error) {
        console.error('Error generating CSV:', error);
        throw new Error('Error generating CSV');
    }

}

const ITEMS_PER_PAGE_EVENTS = 10;
export async function testFetchFilteredEvents(query: string, currentPage: number) {

    const offset = (currentPage - 1) * ITEMS_PER_PAGE_EVENTS;

    try {
        // borrar promesa al final.. es solo para simular la carga de los datos
        console.log('DEBUG: Fetching events data...');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let data;
        if (query === '') {
            data = await sql<Event>`
            SELECT *
            FROM events
            ORDER BY fecha_hora_ingreso DESC
            LIMIT ${ITEMS_PER_PAGE_EVENTS} OFFSET ${offset}
            `;
        } else {
            data = await sql<Event>`
            SELECT *
            FROM events
            WHERE placa ILIKE ${`%${query}%`}
            ORDER BY fecha_hora_ingreso DESC
            LIMIT ${ITEMS_PER_PAGE_EVENTS} OFFSET ${offset}
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

export async function fetchEventsPages(query: string) {
    try {
        let count;
        if (query === '') {
            count = await sql`SELECT COUNT(*)
            FROM events
            `;
        } else {
            count = await sql`SELECT COUNT(*)
            FROM events
            WHERE
            placa ILIKE ${`%${query}%`}
            `;
        }

        console.log('DEBUG: Total events:', count.rows[0].count);
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE_EVENTS);
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
        console.error('DEBUG: Database Error:', error);
        throw new Error('DEBUG: Failed to fetch parkings fees.');
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
        }else{
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
        console.error('DEBUG: Database Error:', error);
        throw new Error('DEBUG: Failed to fetch total number of parking fees.');
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