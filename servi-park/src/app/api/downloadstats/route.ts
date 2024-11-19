import { sql } from '@vercel/postgres';
import { Parser } from 'json2csv';
import { NextResponse } from 'next/server';
import { CardStats } from '@/app/lib/definitions';

export async function GET(request: Request) {
    // Parse query parameters from the URL
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Check if both dates are provided
    if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
        return NextResponse.json({ message: 'No se ha proporcionado un rango de fechas válido.' }, { status: 400 });
    }

    try {
        // Query data from PostgreSQL within the date range
        const data = await sql<CardStats>`
        SELECT 
        AVG(ocupacion_promedio) as ocupacion_promedio,
        AVG(tiempo_medio_duracion) as tiempo_medio_duracion,
        AVG(rotacion_espacios_prom_dia) as rotacion_espacios_prom_dia,
        AVG(porc_vehiculos_recurrentes) as porc_vehiculos_recurrentes
        FROM analytics
        WHERE timestamp BETWEEN ${startDate} AND ${endDate}
        `;

        if (!data || data.rows.length === 0 || data.rows[0]?.ocupacion_promedio === null || data.rows[0]?.tiempo_medio_duracion === null || data.rows[0]?.rotacion_espacios_prom_dia === null || data.rows[0]?.porc_vehiculos_recurrentes === null) {
            return NextResponse.json({ message: 'No se encontraron registros para el rango de fechas proporcionado.' }, { status: 404 });
        }


        // Return the data from the query
        console.log('Statistics data:', data.rows[0]);
        return NextResponse.json(data.rows[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return NextResponse.json({ message: 'Ocurrió un error recuperando la información. Por favor inténtelo nuevamente' }, { status: 500 });
    }
}