// import { db } from '@vercel/postgres';
// import { users, events, incidents } from '../lib/placeholder-data';
// import { PaymentCard, Transaction, Incident} from '../lib/definitions';
// import bcrypt from "bcrypt";

// // const bcrypt = require('bcrypt');

// const client = await db.connect();

// async function createTableUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       nombre_usuario TEXT NOT NULL,
//       nombre_cargo TEXT NOT NULL,
//       celular TEXT NOT NULL,
//       cedula TEXT NOT NULL UNIQUE,
//       contrasena TEXT NOT NULL
//     );
//   `;

// }

// async function createTableEvents() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS events (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
//       transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL ON UPDATE CASCADE,
//       placa TEXT NOT NULL,
//       fecha_hora_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       fecha_hora_salida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       duracion INTERVAL,
//       tarifa TEXT NOT NULL,
//       valor_base NUMERIC,
//       iva NUMERIC,
//       total NUMERIC,
//       tipo_vehiculo TEXT NOT NULL,
//       tiquete_perdido BOOLEAN DEFAULT FALSE
//     );
//   `;

// }

// async function createTableIncidents() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS incidents (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
//       descripcion TEXT NOT NULL,
//       fecha_hora_suceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

// }

// async function createTableGallery() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS gallery (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE ON UPDATE CASCADE,
//       url TEXT NOT NULL
//     );
//   `;

// }

// async function createTableTransactions() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS transactions (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       payment_card_id UUID REFERENCES payment_cards(id) ON DELETE CASCADE ON UPDATE CASCADE,
//       fecha_hora_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       metodo_pago TEXT NOT NULL,
//       valor NUMERIC NOT NULL
//     );
//   `;

// }

// async function createTablePaymentCards() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS payment_cards (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       tipo TEXT NOT NULL,
//       proveedor TEXT NOT NULL,
//       ultimos_cuatro_digitos TEXT NOT NULL,
//       cod_autorizacion_emisor TEXT NOT NULL,
//       estado TEXT NOT NULL
//     );
//   `;
// }

// // --------------------------- SEED TABLES ---------------------------

// async function seedUsers() {
//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.contrasena, 10);
//       return client.sql`
//         INSERT INTO users (nombre_usuario, nombre_cargo, celular, cedula, contrasena)
//         VALUES (${user.nombre_usuario}, ${user.nombre_cargo}, ${user.celular}, ${user.cedula}, ${hashedPassword});
//       `;
//     }),
//   );

//   return insertedUsers;
// }

// async function seedEvents() {
//   const insertedEvents = await Promise.all(
//     events.map((event) => {
//       return client.sql`
//         INSERT INTO events (user_id, placa, fecha_hora_salida, tarifa, tipo_vehiculo)
//         VALUES (${event.user_id}, ${event.placa}, ${null}, ${event.tarifa}, ${event.tipo_vehiculo});
//       `;
//     }),
//   );

//   return insertedEvents;
// }

// async function simulateCarExitCashPayment() {
//   const eventId = '8688466c-cccf-4625-a88f-56a00db3c5dd'; //actualizar por un id valido (si se borra la tabla).

//   const valor_base = 5800;
//   const iva = valor_base * 0.19;
//   const total = valor_base + iva;


//   // registra la transaccion en la tabla de transacciones
//   const response = await client.sql<Transaction>`
//       INSERT INTO transactions (metodo_pago, valor)
//       VALUES ('CONTADO', ${total})
//       RETURNING id;
//     `;

//   const transaction_id = response.rows[0].id;

//   //registra la salida del vehiculo en la tabla de eventos
//   await client.sql`
//       UPDATE events
//       SET (transaction_id, fecha_hora_salida, valor_base, iva, total) = (${transaction_id}, DEFAULT, ${valor_base}, ${iva},${total})
//       WHERE id = ${eventId};
//     `;

//   await client.sql`
//     UPDATE events
//     SET duracion = (fecha_hora_salida - fecha_hora_ingreso)
//     WHERE id = ${eventId}
//   `;

// }

// async function simulateCarExitCardPayment() {
//   const eventId = '5b1489a6-c56d-4376-aef6-06abcf359c0e'; //actualizar por un id valido (si se borra la tabla).

//   const valor_base = 5800;
//   const iva = valor_base * 0.19;
//   const total = valor_base + iva;

//   //registra la tarjeta de pago en la tabla de tarjetas de pago
//   const result = await client.sql<PaymentCard>`
//     INSERT INTO payment_cards (tipo, proveedor, ultimos_cuatro_digitos, cod_autorizacion_emisor, estado)
//     VALUES ('DEBITO', 'VISA', '1234', '1234', 'APROBADO')
//     RETURNING id;
//   `;

//   const payment_card_id = result.rows[0].id;

//   // registra la transaccion en la tabla de transacciones
//   const response = await client.sql<Transaction>`
//     INSERT INTO transactions (payment_card_id, metodo_pago, valor)
//     VALUES (${payment_card_id}, 'CONTADO', ${total})
//     RETURNING id;
//   `;

//   const transaction_id = response.rows[0].id;

//   // registra la salida del vehiculo en la tabla de eventos
//   await client.sql`
//     UPDATE events
//     SET (transaction_id, fecha_hora_salida, valor_base, iva, total) = (${transaction_id}, DEFAULT, ${valor_base}, ${iva},${total})
//     WHERE id = ${eventId};
//   `;

//   await client.sql`
//   UPDATE events
//   SET duracion = (fecha_hora_salida - fecha_hora_ingreso)
//   WHERE id = ${eventId};
// `;
// }

// async function seedIncidentsAndGallery() {
//   const insertedIncidents = await Promise.all(
//     incidents.map((incident) => {
//       return client.sql<Incident>`
//         INSERT INTO incidents (user_id, descripcion)
//         VALUES (${incident.user_id}, ${incident.descripcion})
//         RETURNING id;
//       `;
//     }),
//   );

//   const imageIncidentUrl = 'https://utfs.io/f/tZv4L8MOVx8yIhFDIgpIzPhdOm4J7HlSw6UYog2TvCfL5Xe3';

//   await Promise.all(
//     insertedIncidents.map((incident) => {
//       return client.sql`
//         INSERT INTO gallery (incident_id, url)
//         VALUES (${incident.rows[0].id}, ${imageIncidentUrl});
//       `;
//     }),
//   );

//   return insertedIncidents;
// }

export async function GET() {
  return Response.json({
    message:
      'Uncomment this file and remove this line to seed the db.',
  });
  // try {
  //   await client.sql`BEGIN`;
  //   await seedIncidentsAndGallery();
  //   await client.sql`COMMIT`;

  //   return Response.json({ message: 'Success' });
  // } catch (error) {
  //   await client.sql`ROLLBACK`;
  //   return Response.json({ error }, { status: 500 });
  // }
}
