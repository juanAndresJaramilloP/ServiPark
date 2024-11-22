// import { db } from '@vercel/postgres';
// import { users, events, incidents, parkingFees, blackPlates, incidentPlate, serviPark, stats } from '../lib/placeholder-data';
// import { PaymentCard, Transaction, Incident } from '../lib/definitions';
// import bcrypt from "bcrypt";

// const client = await db.connect();

/**
 * Hay un orden para crear las tablas (revisar esquema de la base de datos en la carpeta docs)
 * uno de los posibles ordenes es:
 * 1. payment_cards
 * 2. transactions
 * 3. users
 * 4. incidents
 * 5. incident_plate
 * 6. black_plates
 * 7. gallery
 * 8. parking_fee
 * 9. events
 * 10. servi_park
 * 11. analytics
 * 
 * Para poblar la base de datos, ejecute localmente y navegue a: localhost:3000/seed
 */


// MARK: - CREATE TABLES

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
//       user_id UUID REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
//       transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL ON UPDATE CASCADE,
//       tarifa_id UUID REFERENCES parking_fee(id) ON DELETE SET NULL ON UPDATE CASCADE,
//       placa TEXT NOT NULL,
//       fecha_hora_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       fecha_hora_salida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       duracion INTERVAL,
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
//       user_id UUID REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
//       descripcion TEXT NOT NULL,
//       fecha_hora_suceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

// }

// async function createTableIncidentPlate() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS incident_plate (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       incident_id UUID REFERENCES incidents(id) ON DELETE SET NULL ON UPDATE CASCADE,
//       placa TEXT NOT NULL
//     );
//   `;
// }

// async function createTableBlackPlates() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS black_plates (
//       user_id UUID REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
//       placa TEXT PRIMARY KEY
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
//       payment_card_id UUID REFERENCES payment_cards(id) ON DELETE SET NULL ON UPDATE CASCADE,
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

// async function createTableParkingFee() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS parking_fee (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       user_id UUID REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
//       week_days_id TEXT NOT NULL,
//       nombre_tarifa TEXT NOT NULL,
//       tipo_vehiculo TEXT NOT NULL,
//       valor_hora NUMERIC NOT NULL,
//       incremento_primer_hora NUMERIC NOT NULL,
//       incremento_segunda_hora NUMERIC NOT NULL,
//       valor_dia NUMERIC NOT NULL,
//       cobrar_valor_dia_a_partir_minuto NUMERIC NOT NULL,
//       primera_hora_a_partir_minuto NUMERIC NOT NULL,
//       hora_adicional_a_partir_minuto NUMERIC NOT NULL,
//       vigencia_desde TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       vigencia_hasta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       exclusivo_mensualidad BOOLEAN DEFAULT FALSE,
//       exclusivo_administracion BOOLEAN DEFAULT FALSE,
//       tarifa_activa BOOLEAN DEFAULT TRUE,
//       nuevo_dia TEXT NOT NULL
//     );
//   `;
// }

// async function createTableServiPark() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS servi_park (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       nombre TEXT NOT NULL,
//       celdas SMALLINT NOT NULL,
//       celdas_vehiculo SMALLINT NOT NULL,
//       celdas_motocicleta SMALLINT NOT NULL,
//       celdas_bicicleta SMALLINT NOT NULL,
//       direccion TEXT NOT NULL
//     );
//   `;
// }

// async function createTableAnalytics(){
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS analytics (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       ocupacion_promedio SMALLINT DEFAULT 0,
//       tiempo_medio_duracion INTERVAL,
//       rotacion_espacios_prom_dia SMALLINT DEFAULT 0,
//       porc_vehiculos_recurrentes SMALLINT DEFAULT 0,
//       ingresos NUMERIC DEFAULT 0,
//       nomina NUMERIC DEFAULT 0,
//       imp_predial NUMERIC DEFAULT 0,
//       servicios_publicos NUMERIC DEFAULT 0,
//       mantenimiento NUMERIC DEFAULT 0,
//       iva NUMERIC DEFAULT 0,
//       otros NUMERIC DEFAULT 0
//     );
//   `;
// }

// MARK: - SEED TABLES

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

// async function seedTableEvents() {
//   const insertedEvents = await Promise.all(
//     events.map((event) => {
//       return client.sql`
//         INSERT INTO events (user_id, tarifa_id, placa, fecha_hora_salida, tipo_vehiculo)
//         VALUES (${event.user_id}, ${event.tarifa_id}, ${event.placa}, ${null}, ${event.tipo_vehiculo});
//       `;
//     }),
//   );

//   return insertedEvents;
// }

// async function simulateCarExitCashPayment() {
//   const eventId = '30f32f54-dd9b-4f2f-abb6-ed92948cfda4'; //actualizar por un id valido (si se borra la tabla).

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
//   const eventId = '10671de7-bee6-4887-9d04-5b723594c32d'; //actualizar por un id valido (si se borra la tabla).

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

// async function seedTableParkingFee() {
//   const insertedParkingFees = await Promise.all(
//     parkingFees.map((fee) => {
//       return client.sql`
//         INSERT INTO parking_fee (user_id, week_days_id, nombre_tarifa, tipo_vehiculo, valor_hora, incremento_primer_hora, incremento_segunda_hora, valor_dia, cobrar_valor_dia_a_partir_minuto, primera_hora_a_partir_minuto, hora_adicional_a_partir_minuto, vigencia_hasta, nuevo_dia)
//         VALUES (${fee.user_id}, ${fee.week_days_id}, ${fee.nombre_tarifa}, ${fee.tipo_vehiculo}, ${fee.valor_hora}, ${fee.incremento_primer_hora}, ${fee.incremento_segunda_hora}, ${fee.valor_dia},${fee.cobrar_valor_dia_a_partir_minuto}, ${fee.primera_hora_a_partir_minuto}, ${fee.hora_adicional_a_partir_minuto}, ${fee.vigencia_hasta}, ${fee.nuevo_dia});
//       `;
//     })
//   );

// }

// async function seedBlackPlates() {

//   const insertedBlackPlates = await Promise.all(
//     blackPlates.map((bp) => {
//       return client.sql`
//         INSERT INTO black_plates (user_id, placa)
//         VALUES (${bp.user_id}, ${bp.placa});
//       `;
//     })
//   );
// }

// async function seedIncidentPlate() {

//   const insertedIncidentPlate = await Promise.all(
//     incidentPlate.map((ip) => {
//       return client.sql`
//         INSERT INTO incident_plate (incident_id, placa)
//         VALUES (${ip.incident_id}, ${ip.placa});
//       `;
//     })
//   );

// }


// async function seedServiPark() {
//   const insertedServiPark = await Promise.all(
//     serviPark.map((sp) => {
//       return client.sql`
//         INSERT INTO servi_park (nombre, celdas, celdas_vehiculo, celdas_motocicleta, celdas_bicicleta, direccion)
//         VALUES (${sp.nombre}, ${sp.celdas},${sp.celdas_vehiculo},${sp.celdas_motocicleta},${sp.celdas_bicicleta}, ${sp.direccion});
//       `;
//     })
//   );
// }

// async function seedTableAnalytics() {
//   await Promise.all(
//     stats.map((stat) => {
//       return client.sql`
//         INSERT INTO analytics (timestamp, ocupacion_promedio, tiempo_medio_duracion, rotacion_espacios_prom_dia, porc_vehiculos_recurrentes, ingresos, nomina, imp_predial, servicios_publicos, mantenimiento, iva, otros)
//         VALUES (${stat.timestamp}, ${stat.ocupacion_promedio}, ${stat.tiempo_medio_duracion}, ${stat.rotacion_espacios_prom_dia}, ${stat.porc_vehiculos_recurrentes}, ${stat.ingresos}, ${stat.nomina}, ${stat.imp_predial}, ${stat.servicios_publicos}, ${stat.mantenimiento}, ${stat.iva}, ${stat.otros});
//       `;
//     })
//   );
// }

export async function GET() {
  return Response.json({
    message:
      'Uncomment this file and remove this line to seed the db.',
  });
  // try {
  //   await client.sql`BEGIN`;
  //   await seedServiPark();
  //   await client.sql`COMMIT`;

  //   return Response.json({ message: 'Success' });
  // } catch (error) {
  //   await client.sql`ROLLBACK`;
  //   return Response.json({ error }, { status: 500 });
  // }
}
