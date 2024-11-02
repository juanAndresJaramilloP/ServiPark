import { sql } from '@vercel/postgres';
import { Event, Incident, User, ParkingFee } from './definitions';
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

export async function testFetchAllEvents(){

    try {
        const data = await sql<Event>`
          SELECT *
          FROM events
          `;

        // Convert `null` values to `undefined` for JSON compatibility
        const formattedData = data.rows.map(event => ({
            ...event,
            transaction_id: event.transaction_id ?? undefined,
            duracion: event.duracion ?? undefined,
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

export async function fetchParkingFees(){
    try {

        console.log('Fetching parking fee data...');
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const data = await sql<ParkingFee>`
        SELECT * FROM parking_fee
        `;

        console.log("Parking fee data fetched successfully.");

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch parkings fees.');
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