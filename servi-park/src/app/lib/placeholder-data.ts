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
        placa: 'ABC123',
        tarifa: 'ESTANDAR',
        tipo_vehiculo: 'AUTOMOVIL'
    },
    {
        user_id: '95723cc3-8cf5-41da-9d32-c3e83ee7b4f8',
        placa: 'DEF456',
        tarifa: 'MENSUALIDAD',
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

const transactions = [
    {
        event_id:'8688466c-cccf-4625-a88f-56a00db3c5dd',
        metodo_pago:'CONTADO',
        valor:'13800'
    },
    {
        event_id:'5b1489a6-c56d-4376-aef6-06abcf359c0e',
        metodo_pago:'TARJETA',
        valor:'13800'
    }
]


export { users, events, incidents, transactions };