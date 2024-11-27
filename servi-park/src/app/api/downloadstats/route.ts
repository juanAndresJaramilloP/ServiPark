import { sql } from '@vercel/postgres';
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
        SUM(rotacion_espacios) as rotacion_espacios
        FROM analytics
        WHERE timestamp BETWEEN ${startDate} AND ${endDate}
        `;

        if (!data || data.rows.length === 0 || data.rows[0]?.ocupacion_promedio === null || data.rows[0]?.tiempo_medio_duracion === null || data.rows[0]?.rotacion_espacios === null) {
            return NextResponse.json({ message: 'No se encontraron registros para el rango de fechas proporcionado.' }, { status: 404 });
        }

        // Compute: porcentaje de vehiculos recurrentes:
        const distinct_placas = await sql`
        SELECT COUNT(*)
        FROM (
            SELECT placa
            FROM events
            WHERE fecha_hora_ingreso BETWEEN ${startDate} AND ${endDate}
            GROUP BY placa
            HAVING COUNT(*) = 1
        ) AS distinct_placas;
        `;

        const total_events_in_range = await sql`
        SELECT COUNT(*)
        FROM events
        WHERE fecha_hora_ingreso BETWEEN ${startDate} AND ${endDate}
        `;

        const porc_vehiculos_recurrentes: number = Number(distinct_placas.rows[0]?.count) / Number(total_events_in_range.rows[0]?.count) * 100;

        const responseData: CardStats = {
            ocupacion_promedio: data.rows[0].ocupacion_promedio,
            tiempo_medio_duracion: data.rows[0].tiempo_medio_duracion,
            rotacion_espacios: data.rows[0].rotacion_espacios,
            porcentaje_vehiculos_recurrentes: porc_vehiculos_recurrentes ?? 0
        };

        // Return the data from the query
        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return NextResponse.json({ message: 'Ocurrió un error recuperando la información. Por favor inténtelo nuevamente' }, { status: 500 });
    }
}