import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from '@vercel/postgres';
import { AuthUser } from "@/app/lib/definitions";
import { z } from 'zod';
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: "Usuario",
                    type: "text",
                    placeholder: "su cedula"
                },
                password: {
                    label: "Contraseña",
                    type: "password"
                }
            },
            async authorize(credentials) { //aquí se hace la autenticación con la base de datos, retrieve credentials from db,
                if (!credentials) {
                    return null;
                }
                const password  = credentials.password;
                const parsedCredentials = z
                    .object({ username: z.string().max(12), password: z.string().max(30) })
                    .safeParse(credentials);
                try {
                    if (!parsedCredentials.success) {
                        return null;
                    }

                    const user = await sql<AuthUser>`SELECT id, nombre_usuario, nombre_cargo, contrasena FROM users WHERE cedula = ${parsedCredentials.data.username}`;
                    if (user && user.rows.length > 0) {
                        const passwordsMatch = await bcrypt.compare(password, user.rows[0].contrasena);
                        if(passwordsMatch){
                            const objUser = {
                                id: user.rows[0].id,
                                name: user.rows[0].nombre_usuario,
                                role: user.rows[0].nombre_cargo
                            }
                            return objUser;
                        }
                        return null;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        // to use the role in client components
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        }
    },
    theme: {
        colorScheme: "light",
        logo: "https://utfs.io/f/tZv4L8MOVx8yU9rvcAJcN3C8BPkv0i7RsynfpSuWXVEmt9lK",
    },
    // pages: {
    //     signIn: '/login',
    // },
}