// Type Definitions.

export type User = {
    id: string;
    nombre_usuario: string;
    nombre_cargo: 'ADMIN' | 'EMPLEADO';
    celular: string;
    cedula: string;
    contrasena: string;
};

export type Event = {
    id: string;
    user_id: string;
    transaction_id: string | null;
    placa: string;
    fecha_hora_ingreso: string;
    fecha_hora_salida: string;
    duracion: string | null;
    tarifa: 'ESTANDAR' | 'MENSUALIDAD';
    valor_base: number | null;
    iva: number | null;
    total: number | null;
    tipo_vehiculo: 'AUTOMOVIL' | 'CAMIONETA' | 'MOTOCICLETA' | 'BICICLETA';
    tiquete_perdido: boolean;
};

export type Incident = {
    id: string;
    user_id: string;
    descripcion: string;
    fecha_hora_suceso: string;
};

export type Gallery = {
    id: string;
    incident_id: string;
    url: string;
};

export type Transaction = {
    id: string;
    payment_card_id: string | null;
    fecha_hora_transaccion: string;
    metodo_pago: 'CONTADO' | 'TARJETA';
    valor: number;
};

export type PaymentCard = {
    id: string;
    tipo: 'DEBITO' | 'CREDITO';
    proveedor: 'VISA' | 'MASTERCARD';
    ultimos_cuatro_digitos: string;
    cod_autorizacion_emisor: string;
    estado: 'APROBADO' | 'RECHAZADO' | 'PENDIENTE';
};