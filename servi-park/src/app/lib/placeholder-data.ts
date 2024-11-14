//placeholder data for trying the app functionalities

const users = [
    {
        nombre_usuario: 'Juan Andres Jaramillo',
        nombre_cargo: 'ADMIN',
        celular: '1234567890',
        cedula: '1234567890',
        contrasena: 'admin'
    },
    {
        nombre_usuario: 'Paola Rodriguez',
        nombre_cargo: 'EMPLEADO',
        celular: '0987654321',
        cedula: '0987654321',
        contrasena: 'empleado'
    }
]

const events = [
    {
        user_id: 'beb58dfd-dce5-41c1-bbcc-39ecdb9e2724',
        tarifa_id: '2bf2c7ae-524d-49bd-aa4e-73f79577d814',
        placa: 'ABC123',
        tipo_vehiculo: 'AUTOMOVIL'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: '2bf2c7ae-524d-49bd-aa4e-73f79577d814',
        placa: 'DEF456',
        tipo_vehiculo: 'CAMIONETA'
    },
    {
        user_id: 'beb58dfd-dce5-41c1-bbcc-39ecdb9e2724',
        tarifa_id: '2bf2c7ae-524d-49bd-aa4e-73f79577d814',
        placa: 'GHI789',
        tipo_vehiculo: 'AUTOMOVIL'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: '2bf2c7ae-524d-49bd-aa4e-73f79577d814',
        placa: 'JKL012',
        tipo_vehiculo: 'CAMIONETA'
    },
    {
        user_id: 'beb58dfd-dce5-41c1-bbcc-39ecdb9e2724',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'MNO345',
        tipo_vehiculo: 'AUTOMOVIL'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'PQR678',
        tipo_vehiculo: 'CAMIONETA'
    },
    {
        user_id: 'beb58dfd-dce5-41c1-bbcc-39ecdb9e2724',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'B001',
        tipo_vehiculo: 'BICICLETA'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'VWX234',
        tipo_vehiculo: 'MOTOCICLETA'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'YZA456',
        tipo_vehiculo: 'CAMIONETA'
    },
    {
        user_id: 'beb58dfd-dce5-41c1-bbcc-39ecdb9e2724',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'B002',
        tipo_vehiculo: 'BICICLETA'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'EFG012',
        tipo_vehiculo: 'MOTOCICLETA'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'VWX234',
        tipo_vehiculo: 'MOTOCICLETA'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'YZA456',
        tipo_vehiculo: 'CAMIONETA'
    },
    {
        user_id: 'beb58dfd-dce5-41c1-bbcc-39ecdb9e2724',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'B003',
        tipo_vehiculo: 'BICICLETA'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: '5211beb0-6c30-4b45-977d-c998eb4509a8',
        placa: 'EFG012',
        tipo_vehiculo: 'MOTOCICLETA'
    }
]

const incidents = [
    {
        user_id: 'beb58dfd-dce5-41c1-bbcc-39ecdb9e2724',
        descripcion: 'Se rompio la barrera de entrada'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        descripcion: 'Se esta filtrando el agua por el techo de la oficina del administrador'
    }
]

const parkingFees = [
    {
        user_id: 'beb58dfd-dce5-41c1-bbcc-39ecdb9e2724',
        week_days_id: '1111111',
        nombre_tarifa: 'Estandar automóvil 2024', 
        tipo_vehiculo: 'AUTOMOVIL',
        valor_hora: 4700,
        incremento_primer_hora: 3000,
        incremento_segunda_hora: 3000,
        valor_dia: 12000,
        primera_hora_a_partir_minuto: 15,
        hora_adicional_a_partir_minuto: 15,
        vigencia_hasta: '2025-01-08T04:05:06',
        nuevo_dia: 'NUEVO_DIA_CALENDARIO'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        week_days_id: '0000011',
        nombre_tarifa: 'Estándar fin de semana automóviles 2024', 
        tipo_vehiculo: 'AUTOMOVIL',
        valor_hora: 3700,
        incremento_primer_hora: 2000,
        incremento_segunda_hora: 2000,
        valor_dia: 10000,
        primera_hora_a_partir_minuto: 15,
        hora_adicional_a_partir_minuto: 15,
        vigencia_hasta: '2025-01-08T04:05:06',
        nuevo_dia: '12_HORAS'
    }
]

const incidentPlate = [
    {
        incident_id: '42a1e91a-46f4-4b53-8b70-0b012b3ca811',
        placa: 'ABC123'
    },
    {
        incident_id: '42a1e91a-46f4-4b53-8b70-0b012b3ca811',
        placa: 'BAC123'
    },
    {
        incident_id: 'cf1f3dc0-adfd-4194-9ee4-d907557967f2',
        placa: 'BAC123'
    }
]

const blackPlates = [
    {
        user_id: 'beb58dfd-dce5-41c1-bbcc-39ecdb9e2724',
        placa: 'BAC123'
    }
]

const serviPark = [
    {
        nombre: "ServiPark",
        celdas: 100,
        direccion: "Calle 123 # 45-67",
    }
]

const analytics = [
    {
        timestamp: '2024-01-01T04:05:06',
        ocupacion_promedio: 90, // 90%
        tiempo_medio_duracion: '02:30:00', // 2 horas 30 minutos
        rotacion_espacios_prom_dia: 340, // 3,4 vehiculos x dia (se multiplica por 100)
        porc_vehiculos_recurrentes: 70, // 70%
        ingresos: 20000000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 3800000,
        otros: 0
    },
    {
        timestamp: '2024-01-02T04:05:06',
        ocupacion_promedio: 88,
        tiempo_medio_duracion: '02:00:00',
        rotacion_espacios_prom_dia: 320,
        porc_vehiculos_recurrentes: 60,
        ingresos: 18000000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 3400000,
        otros: 1200000
    },
    {
        timestamp: '2024-01-30T04:05:06',
        ocupacion_promedio: 87,
        tiempo_medio_duracion: '01:45:15',
        rotacion_espacios_prom_dia: 300,
        porc_vehiculos_recurrentes: 71,
        ingresos: 19851000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 3500000,
        otros: 0
    },
    {
        timestamp: '2024-02-01T04:05:06',
        ocupacion_promedio: 91,
        tiempo_medio_duracion: '01:45:15',
        rotacion_espacios_prom_dia: 380,
        porc_vehiculos_recurrentes: 78,
        ingresos: 23851000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4200000,
        otros: 0
    },
    {
        timestamp: '2024-02-10T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-03-12T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-04-15T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-04-17T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-05-01T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-06-03T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-07-07T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 10000000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-08-24T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 10000000,
        imp_predial: 5000000,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-09-25T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 12350000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-10-01T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 26851000,
        nomina: 12350000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-11-04T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 27851000,
        nomina: 12350000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    },
    {
        timestamp: '2024-11-07T04:05:06',
        ocupacion_promedio: 92,
        tiempo_medio_duracion: '02:45:15',
        rotacion_espacios_prom_dia: 390,
        porc_vehiculos_recurrentes: 85,
        ingresos: 28851000,
        nomina: 12350000,
        imp_predial: 0,
        servicios_publicos: 1200000,
        mantenimiento: 200000,
        iva: 4750000,
        otros: 0
    }
]

export { users, events, incidents, parkingFees, incidentPlate, blackPlates, serviPark, analytics as stats };