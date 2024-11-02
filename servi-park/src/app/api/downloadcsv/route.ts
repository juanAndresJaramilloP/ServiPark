import { sql } from '@vercel/postgres';
import { Parser } from 'json2csv';
import { NextResponse } from 'next/server';

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
        const result = await sql`
        SELECT * FROM events WHERE fecha_hora_ingreso BETWEEN ${startDate} AND ${endDate}
        `;

        if (!result || result.rows.length === 0) {
            return NextResponse.json({ message: 'No se encontraron registros para el rango de fechas proporcionado.' }, { status: 404 });
        }

        // Generate CSV using json2csv
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(result.rows);

        // Create a filename using the date range, e.g., historico_2023-01-01_to_2023-12-31.csv
        const filename = `historico_${startDate}_${endDate}.csv`;

        // Set headers and send CSV data
        return new NextResponse(csv, {
            headers: {
                'Content-Disposition': `attachment; filename=${filename}`,
                'Content-Type': 'text/csv',
            },
            status: 200,
        });
    } catch (error) {
        console.error('Error generating CSV:', error);
        return NextResponse.json({ message: 'Ocurrió un error generado el archivo csv. Espere un momento e intente nuevamente' }, { status: 500 });
    }
}