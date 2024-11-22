'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentLocalTimestampString, formatCurrencyToNumber } from '@/app/lib/utils';
import { BillingData, BillingState, Transaction, InvoiceEvent, PaymentCard } from '@/app/lib/definitions';
import bcrypt from "bcrypt";

// MARK: - SCHEMAS

const ParkingFeeSchema = z.object({
    id: z.string(),
    userID: z.string(),
    week_days_id: z.string(),
    NombreTarifa: z.string({ required_error: "Debe ingresar un nombre valido para la tarifa." }).max(100, { message: "Maximo 100 caracteres" }),
    TipoVehiculo: z.enum(['Automóvil', 'Camioneta', 'Motocicleta', 'Bicicleta']),
    ValorHora: z.coerce.number({ required_error: "Debe ingresar un valor hora." }).gte(0, { message: 'Por favor, ingrese un numero mayor o igual a $0.' }).lt(1000000, { message: 'El valor de la hora no puede ser superior a $999,999' }),
    IncrementoPrimerHora: z.coerce.number({ required_error: "Debe ingresar un valor para el incremento de la primera hora." }).gte(0, { message: 'Por favor, ingrese un numero mayor o igual a $0.' }).lt(1000000, { message: 'El valor del incremento no puede ser superior a $999,999' }),
    IncrementoSegundaHora: z.coerce.number({ required_error: "Debe ingresar un valor para el incremento de la segunda hora." }).gte(0, { message: 'Por favor, ingrese un numero mayor o igual a $0.' }).lt(1000000, { message: 'El valor del incremento no puede ser superior a $999,999' }),
    ValorDia: z.coerce.number({ required_error: "Debe ingresar un valor dia." }).gte(0, { message: 'Por favor, ingrese un numero mayor o igual a $0.' }).lt(1000000, { message: 'El valor del incremento no puede ser superior a $999,999' }),
    CobrarDiaAPartirMin: z.coerce.number({ required_error: "Debe ingresar el minuto a partir del cual se cobra el valor del dia." }).nonnegative({ message: 'Por favor, ingrese un numero mayor o igual a 0.' }),
    FlagPrimeraHora: z.coerce.number({ required_error: "Debe ingresar el minuto a partir del cual se cobra la primera hora." }).nonnegative({ message: 'Por favor, ingrese un numero mayor o igual a 0.' }).lte(59, { message: 'Por favor, ingrese un numero menor o igual a 59.' }),
    FlagHoraAdicional: z.coerce.number({ required_error: "Debe ingresar el minuto a partir del cual se cobra la hora adicional." }).nonnegative({ message: 'Por favor, ingrese un numero mayor o igual a 0.' }).lte(59, { message: 'Por favor, ingrese un numero menor o igual a 59.' }),
    Lunes: z.coerce.boolean().optional(),
    Martes: z.coerce.boolean().optional(),
    Miercoles: z.coerce.boolean().optional(),
    Jueves: z.coerce.boolean().optional(),
    Viernes: z.coerce.boolean().optional(),
    Sabado: z.coerce.boolean().optional(),
    Domingo: z.coerce.boolean().optional(),
    VigenciaDesde: z.string(),
    VigenciaHasta: z.string(),
    ExclusivoMensualidad: z.coerce.boolean().optional(),
    ExclusivoAdministracion: z.coerce.boolean().optional(),
    TarifaActiva: z.coerce.boolean().optional(),
    CobrarNuevoDiaCada: z.enum(['Nuevo día calendario', '24 horas', '12 horas', '8 horas']),
});

const CarRegistrationSchema = z.object({
    userID: z.string(),
    Tarifa: z.string(),
    Placa: z.string({ required_error: "Debe ingresar una placa." }).max(6, { message: "Maximo 6 caracteres" }).min(4, { message: "Minimo 4 caracteres" }),
    TipoVehiculo: z.enum(['Automóvil', 'Camioneta', 'Motocicleta', 'Bicicleta']),
});

const EmployeeSchema = z.object({
    id: z.string(),
    nombre: z.string({ required_error: "Debe ingresar un nombre." }).max(100, { message: "Maximo 100 caracteres" }),
    cargo: z.enum(['EMPLEADO', 'ADMINISTRADOR', 'GERENTE']),
    cedula: z.string({ required_error: "Debe ingresar una cedula." }).max(10, { message: "Maximo 10 caracteres" }).min(7, { message: "Minimo 7 caracteres" }),
    celular: z.string({ required_error: "Debe ingresar un celular." }).max(10, { message: "Maximo 10 caracteres" }).min(10, { message: "Minimo 10 caracteres" }),
    contrasena: z.string({ required_error: "Debe ingresar una contraseña." }).min(5, { message: "Minimo 6 caracteres" }).max(300, { message: "Maximo 300 caracteres" }),
});


const CreateParkingFee = ParkingFeeSchema.omit({ id: true, week_days_id: true });
const CreateEmployee = EmployeeSchema.omit({ id: true });
const EditEmployee = EmployeeSchema.omit({ contrasena: true, id: true });

// EMPLOYEE RELATED ACTIONS

// Register a vehicle
// Update vehicle By plate
// - Para registrar su salida 
// - Para registrar tiquete a perdida
// - Para registrar placa en lista negra
// Reportar un incidente

// MARK: - ACTIONS
export async function createParkingFee(formData: FormData) {

    const rawFormData = Object.fromEntries(formData.entries())
    // validate using zod
    const validatedFields = CreateParkingFee.safeParse(rawFormData);
    if (!validatedFields.success) {
        console.log("DEBUG validated Fields Errors: ", validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. No se pudo crear la tarifa.',
        };
    }

    console.log("DEBUG: validated data: ", validatedFields.data);

    const lunes = validatedFields.data.Lunes ? '1' : '0';
    const martes = validatedFields.data.Martes ? '1' : '0';
    const miercoles = validatedFields.data.Miercoles ? '1' : '0';
    const jueves = validatedFields.data.Jueves ? '1' : '0';
    const viernes = validatedFields.data.Viernes ? '1' : '0';
    const sabado = validatedFields.data.Sabado ? '1' : '0';
    const domingo = validatedFields.data.Domingo ? '1' : '0';

    const week_days_id = lunes + martes + miercoles + jueves + viernes + sabado + domingo;

    console.log("DEBUG: week days ID: ", week_days_id);

    try {
        // insert the new parking fee:
        // prepare the insert statement
        if (new Date(validatedFields.data.VigenciaDesde) > new Date(validatedFields.data.VigenciaHasta)) {
            return {
                message: 'La fecha de inicio de vigencia no puede ser mayor a la fecha del fin de la vigencia.',
            };
        }

        let tipoVehiculo = '';
        switch (validatedFields.data.TipoVehiculo) {
            case 'Automóvil':
                tipoVehiculo = 'AUTOMOVIL';
                break;
            case 'Camioneta':
                tipoVehiculo = 'CAMIONETA';
                break;
            case 'Motocicleta':
                tipoVehiculo = 'MOTOCICLETA';
                break;
            case 'Bicicleta':
                tipoVehiculo = 'BICICLETA';
                break;
        }

        let nuevoDia = '';
        switch (validatedFields.data.CobrarNuevoDiaCada) {
            case 'Nuevo día calendario':
                nuevoDia = 'NUEVO_DIA_CALENDARIO';
                break;
            case '24 horas':
                nuevoDia = '24_HORAS';
                break;
            case '12 horas':
                nuevoDia = '12_HORAS';
                break;
            case '8 horas':
                nuevoDia = '8_HORAS';
                break;
        }

        await sql`
        INSERT INTO parking_fee (user_id, week_days_id, nombre_tarifa, tipo_vehiculo, valor_hora, incremento_primer_hora, incremento_segunda_hora, valor_dia, cobrar_valor_dia_a_partir_minuto, primera_hora_a_partir_minuto, hora_adicional_a_partir_minuto, vigencia_desde, vigencia_hasta, exclusivo_mensualidad, exclusivo_administracion, tarifa_activa, nuevo_dia)
        VALUES (${validatedFields.data.userID}, ${week_days_id}, ${validatedFields.data.NombreTarifa}, ${tipoVehiculo}, ${validatedFields.data.ValorHora}, ${validatedFields.data.IncrementoPrimerHora}, ${validatedFields.data.IncrementoSegundaHora}, ${validatedFields.data.ValorDia}, ${validatedFields.data.CobrarDiaAPartirMin}, ${validatedFields.data.FlagPrimeraHora}, ${validatedFields.data.FlagHoraAdicional}, ${validatedFields.data.VigenciaDesde}, ${validatedFields.data.VigenciaHasta}, ${validatedFields.data.ExclusivoMensualidad || false}, ${validatedFields.data.ExclusivoAdministracion || false}, ${validatedFields.data.TarifaActiva || false}, ${nuevoDia})
        `;

    } catch (error) {
        console.error('DEBUG: Error creating parking fee:\n', error);

        if (error instanceof Error && error.message.includes('duplicate key value violates unique constraint')) {
            return {
                message: 'El nombre de la tarifa ya existe. Por favor, elija un nombre diferente.',
            };
        }

        return {
            message: 'Ocurrio un error al intentar crear la tarifa. Por favor intentelo nuevamente.',
        };
    }

    // Revalidate the cache for the parking fee page and redirect the user.
    revalidatePath('/admin/configurartarifas');
    revalidatePath('/employees/registrarvehiculo');
    redirect('/admin/configurartarifas');
}

export async function registerVehicle(formData: FormData) {

    const rawFormData = Object.fromEntries(formData.entries())

    // validate using zod
    const validatedFields = CarRegistrationSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        console.log("DEBUG validated Fields Errors: ", validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. No se pudo registrar la entrada del vehiculo.',
        };
    }

    // Prepare for data insertion
    // check if the vehicle is already registered
    try {
        const isVehicleInSystem = await sql`
        SELECT *
        FROM events
        WHERE placa = ${validatedFields.data.Placa} AND fecha_hora_salida IS NULL
        `;

        if (isVehicleInSystem.rows.length > 0) {
            console.log('DEBUG: Vehicle already in system.');
            return {
                message: `El vehiculo del placa: ${validatedFields.data.Placa.toUpperCase()} ya se encuentra registrado en el sistema.`,
            };
        }

    } catch (error) {
        console.error('DEBUG: Error registering vehicle:\n', error);
        return {
            message: 'Ocurrio un error al intentar registrar la entrada del vehiculo. Por favor intentelo nuevamente.',
        };
    }

    // insert event:
    const fechaHoraIngreso = getCurrentLocalTimestampString();

    console.log("DEBUG: Fecha Hora Ingreso: ", fechaHoraIngreso);

    try {
        await sql`
        INSERT INTO events (user_id, tarifa_id, placa, fecha_hora_ingreso, fecha_hora_salida, tipo_vehiculo)
        VALUES (${validatedFields.data.userID}, ${validatedFields.data.Tarifa}, ${validatedFields.data.Placa.toUpperCase()}, ${fechaHoraIngreso}, ${null}, ${validatedFields.data.TipoVehiculo})
        `;

    } catch (error) {
        console.error('DEBUG: Error registering vehicle:\n', error);
        return {
            message: 'Ocurrio un error al intentar registrar la entrada del vehiculo. Por favor intentelo nuevamente.',
        };
    }

    // Revalidate cache and redirect user.
    console.log('DEBUG: Vehicle registered successfully.');

    revalidatePath('/employees/registrarvehiculo');
    revalidatePath('/employees/retirarvehiculo');
    revalidatePath('/employees/historial');
    revalidatePath('/admin/consultarreportes');
    redirect('/employees');

}


export async function registerPayment(billingData: BillingData): Promise<BillingState> {

    const { formattedCurrency, placa } = billingData;
    const metodoDePago = billingData.metodoDePago;
    const numberCurrency = formatCurrencyToNumber(formattedCurrency);

    if(!placa || !formattedCurrency || !metodoDePago){
        return {
            error: 'Debe seleccionar un metodo de pago.',
        };
    }

    try {
        // Verifica que el vehiculo efectivamente tenga una entrada activa (sin cancelar) en el parqueadero.
        const event = await sql<InvoiceEvent>`
        SELECT
        id,
        tarifa_id,
        fecha_hora_ingreso
        FROM events
        WHERE placa ILIKE ${placa} AND fecha_hora_salida IS NULL
        `;

        if (event.rows.length === 0) {
            return {
                error: `El vehiculo con placa ${placa.toUpperCase()} no tiene una entrada activa (sin cancelar) en el sistema.`,
            };
        }

        let response;
        if (metodoDePago === 'Tarjeta') {
            //registra la tarjeta de pago en la tabla de tarjetas de pago
            const result = await sql<PaymentCard>`
            INSERT INTO payment_cards (tipo, proveedor, ultimos_cuatro_digitos, cod_autorizacion_emisor, estado)
            VALUES ('DEBITO', 'VISA', '1234', '1234', 'APROBADO')
            RETURNING id;
            `;

            const payment_card_id = result.rows[0].id;

            // registra la transaccion en la tabla de transacciones
            response = await sql<Transaction>`
            INSERT INTO transactions (payment_card_id, metodo_pago, valor)
            VALUES (${payment_card_id}, ${metodoDePago.toUpperCase()}, ${numberCurrency})
            RETURNING id;
            `;
        } else {
            // registra la transaccion en la tabla de transacciones
            response = await sql<Transaction>`
            INSERT INTO transactions (metodo_pago, valor)
            VALUES (${metodoDePago.toUpperCase()}, ${numberCurrency})
            RETURNING id;
            `;
        }
        const transaction_id = response.rows[0].id;

        //registra la salida del vehiculo en la tabla de eventos
        const eventId = event.rows[0].id;
        const iva = numberCurrency * 0.19;
        const valor_base = numberCurrency - iva;
        const total = numberCurrency

        await sql`
        UPDATE events
        SET (transaction_id, fecha_hora_salida, valor_base, iva, total) = (${transaction_id}, DEFAULT, ${valor_base}, ${iva},${total})
        WHERE id = ${eventId};
        `;

        await sql`
        UPDATE events
        SET duracion = (fecha_hora_salida - fecha_hora_ingreso)
        WHERE id = ${eventId}
        `;

        return {
            message: '¡Pago registrado exitosamente!',
        };

    } catch (error) {
        console.error('DEBUG: Error registering payment:\n', error);
        return {
            error: 'Ocurrio un error al intentar registrar el pago. Por favor intentelo nuevamente.',
        };
    }

}

export async function deleteEmployee(id: string) {
    try {
        await sql`
        DELETE FROM users
        WHERE id = ${id}
        `;
    } catch (error) {
        console.error('DEBUG: Error deleting employee:\n', error);
        return {
            error: 'Ocurrio un error al intentar eliminar el empleado. Por favor intentelo nuevamente.',
        };
    }


    revalidatePath('/management/employees');
}

export async function addEmployee(formData: FormData) {

    const rawFormData = Object.fromEntries(formData.entries())
    // validate using zod
    const validatedFields = CreateEmployee.safeParse(rawFormData);
    if (!validatedFields.success) {
        console.log("DEBUG validated Fields Errors: ", validatedFields.error.flatten().fieldErrors)
        return {
            error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
            message: 'Error de validación. No se pudo agregar el empleado.',
        };
    }

    try {
        const hashedPassword = await bcrypt.hash(validatedFields.data.contrasena, 10);
        await sql`
          INSERT INTO users (nombre_usuario, nombre_cargo, celular, cedula, contrasena)
          VALUES (${validatedFields.data.nombre}, ${validatedFields.data.cargo}, ${validatedFields.data.celular}, ${validatedFields.data.cedula}, ${hashedPassword});
        `;
    } catch (error) {
        console.error('DEBUG: Error adding employee:\n', error);
        return {
            error: 'Ocurrio un error al intentar agregar el empleado. Por favor intentelo nuevamente.',
        };
    }

    revalidatePath('/management/employees');
    return {
        message: '¡Empleado agregado exitosamente!',
    };
}

export async function updateEmployee(formData: FormData, id: string) {

    const rawFormData = Object.fromEntries(formData.entries())
    // validate using zod
    const validatedFields = EditEmployee.safeParse(rawFormData);
    if (!validatedFields.success) {
        console.log("DEBUG validated Fields Errors: ", validatedFields.error.flatten().fieldErrors)
        return {
            error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
            message: 'Error de validación. No se pudo editar el empleado.',
        };
    }

    try{
        await sql`
        UPDATE users
        SET nombre_usuario = ${validatedFields.data.nombre}, nombre_cargo = ${validatedFields.data.cargo}, cedula = ${validatedFields.data.cedula}, celular = ${validatedFields.data.celular}
        WHERE id = ${id};
        `;
    }catch(error){
        console.error('DEBUG: Error updating employee:\n', error);
        return {
            error: 'Ocurrio un error al intentar editar el empleado. Por favor intentelo nuevamente.',
        };
    }

    revalidatePath('/management/employees');
    return {
        message: '¡Empleado editado exitosamente!',
    };
};

// export async function authenticate(
//     prevState: string | undefined,
//     formData: FormData,
// ) {
//     try {
//         await signIn('credentials', formData);
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case 'CredentialsSignin':
//                     return 'Invalid credentials.';
//                 default:
//                     return 'Something went wrong.';
//             }
//         }
//         throw error;
//     }
// }
