'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// MARK: - SCHEMAS

const ParkingFeeSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    week_days_id: z.string(),
    NombreTarifa: z.string({ required_error: "Debe ingresar un nombre valido para la tarifa." }).max(100, { message: "Maximo 100 caracteres" }),
    TipoVehiculo: z.enum(['Automóvil', 'Camioneta', 'Motocicleta', 'Bicicleta']),
    ValorHora: z.coerce.number({ required_error: "Debe ingresar un valor hora." }).gte(0, { message: 'Por favor, ingrese un numero mayor o igual a $0.' }).lt(1000000, { message: 'El valor de la hora no puede ser superior a $999,999' }),
    IncrementoPrimerHora: z.coerce.number({ required_error: "Debe ingresar un valor para el incremento de la primera hora." }).gte(0, { message: 'Por favor, ingrese un numero mayor o igual a $0.' }).lt(1000000, { message: 'El valor del incremento no puede ser superior a $999,999' }),
    IncrementoSegundaHora: z.coerce.number({ required_error: "Debe ingresar un valor para el incremento de la segunda hora." }).gte(0, { message: 'Por favor, ingrese un numero mayor o igual a $0.' }).lt(1000000, { message: 'El valor del incremento no puede ser superior a $999,999' }),
    ValorDia: z.coerce.number({ required_error: "Debe ingresar un valor dia." }).gte(0, { message: 'Por favor, ingrese un numero mayor o igual a $0.' }).lt(1000000, { message: 'El valor del incremento no puede ser superior a $999,999' }),
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
    user_id: z.string(),
    Tarifa: z.string(),
    Placa: z.string({ required_error: "Debe ingresar una placa valida." }).max(6, { message: "Maximo 6 caracteres" }).min(4, { message: "Minimo 4 caracteres" }),
    TipoVehiculo: z.enum(['Automóvil', 'Camioneta', 'Motocicleta', 'Bicicleta']),
});



const CreateParkingFee = ParkingFeeSchema.omit({ id: true, user_id: true });
const RegisterVehicle = CarRegistrationSchema.omit({ user_id: true });

// EMPLOYEE RELATED ACTIONS

// Register a vehicle
// Update vehicle By plate
// - Para registrar su salida 
// - Para registrar tiquete a perdida
// - Para registrar placa en lista negra
// Reportar un incidente

// const FormSchema = z.object({
//     id: z.string(),
//     customerId: z.string({
//         invalid_type_error: 'Please select a customer.',
//     }),
//     amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
//     status: z.enum(['pending', 'paid'], {
//         invalid_type_error: 'Please select an invoice status.',
//     }),
//     date: z.string(),
//     desde: z.date(),
//     hasta: z.date(),
// });

// export type State = {
//     errors?: {
//         customerId?: string[];
//         amount?: string[];
//         status?: string[];
//     };
//     message?: string | null;
// };

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
        // user id: beb58dfd-dce5-41c1-bbcc-39ecdb9e2724 FOR TESTING, DELETE WHEN AUTH IS DONE.

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
        INSERT INTO parking_fee (user_id, week_days_id, nombre_tarifa, tipo_vehiculo, valor_hora, incremento_primer_hora, incremento_segunda_hora, valor_dia, primera_hora_a_partir_minuto, hora_adicional_a_partir_minuto, vigencia_desde, vigencia_hasta, exclusivo_mensualidad, exclusivo_administracion, tarifa_activa, nuevo_dia)
        VALUES ('beb58dfd-dce5-41c1-bbcc-39ecdb9e2724', ${week_days_id}, ${validatedFields.data.NombreTarifa}, ${tipoVehiculo}, ${validatedFields.data.ValorHora}, ${validatedFields.data.IncrementoPrimerHora}, ${validatedFields.data.IncrementoSegundaHora}, ${validatedFields.data.ValorDia}, ${validatedFields.data.FlagPrimeraHora}, ${validatedFields.data.FlagHoraAdicional}, ${validatedFields.data.VigenciaDesde}, ${validatedFields.data.VigenciaHasta}, ${validatedFields.data.ExclusivoMensualidad || false}, ${validatedFields.data.ExclusivoAdministracion || false}, ${validatedFields.data.TarifaActiva || false}, ${nuevoDia})
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
    redirect('/admin/configurartarifas');
}

export async function registerVehicle(formData: FormData) {

    const rawFormData = Object.fromEntries(formData.entries())
    console.log("DEBUG: rawFormData: ", rawFormData);

    // validate using zod
    const validatedFields = RegisterVehicle.safeParse(rawFormData);
    if (!validatedFields.success) {
        console.log("DEBUG validated Fields Errors: ", validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. No se pudo registrar la entrada del vehiculo.',
        };
    }

    // ID tarifa: dd14bd15-8dc2-4405-96ad-a163bdbb7b09 FOR TESTING
    // ID user: beb58dfd-dce5-41c1-bbcc-39ecdb9e2724 FOR TESTING

}