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
        tarifa_id: '79f1f3e0-bf21-4415-88ec-313f8e7fd63a',
        placa: 'ABC123',
        tipo_vehiculo: 'AUTOMOVIL'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        tarifa_id: 'dd14bd15-8dc2-4405-96ad-a163bdbb7b09',
        placa: 'DEF456',
        tipo_vehiculo: 'CAMIONETA'
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

const weekDays = [
    {
        business_id : "1111111",
        lunes: "1",
        martes:"1",
        miercoles:"1",
        jueves:"1",
        viernes:"1",
        sabado:"1",
        domingo:"1"
    },
    {
        business_id : "0000011",
        lunes: "0",
        martes:"0",
        miercoles:"0",
        jueves:"0",
        viernes:"0",
        sabado:"1",
        domingo:"1"
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


export { users, events, incidents, parkingFees, weekDays, incidentPlate, blackPlates };