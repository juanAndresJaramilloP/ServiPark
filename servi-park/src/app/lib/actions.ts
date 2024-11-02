// 'use server';

// import { z } from 'zod';
// import { sql } from '@vercel/postgres';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// import { signIn } from '@/auth'
// import  AuthError  from 'next-auth'

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

