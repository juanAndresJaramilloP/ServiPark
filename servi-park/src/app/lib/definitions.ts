// Type Definitions.

export type User = {
    id: string;
    nombre_usuario: string;
    nombre_cargo: 'ADMINISTRADOR' | 'EMPLEADO' | 'GERENTE';
    celular: string;
    cedula: string;
    contrasena: string;
};

export type AuthUser = {
    id: string;
    nombre_usuario: string;
    nombre_cargo: 'ADMINISTRADOR' | 'EMPLEADO' | 'GERENTE';
    contrasena: string;

};

export type PostgresInterval = {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
};

export type Event = {
    id: string;
    user_id: string;
    transaction_id: string | null;
    tarifa_id: string;
    placa: string;
    fecha_hora_ingreso: string;
    fecha_hora_salida: string;
    duracion: PostgresInterval; // PostresInterval object.
    valor_base: number | null;
    iva: number | null;
    total: number | null;
    tipo_vehiculo: 'AUTOMOVIL' | 'CAMIONETA' | 'MOTOCICLETA' | 'BICICLETA';
    tiquete_perdido: boolean;
};

export type InvoiceEvent = {
    id: string;
    tarifa_id: string;
    fecha_hora_ingreso: string;
    tipo_vehiculo: 'AUTOMOVIL' | 'CAMIONETA' | 'MOTOCICLETA' | 'BICICLETA';
};

export type InvoiceData = {
    fechaHoraIngreso: Date | undefined;
    fechaHoraSalida: Date | undefined;
    formattedCurrency: string;
    nombreTarifa: string;
    placa: string;
};

export type InvoiceDataState = {
    errors?: {
        Placa?: string[];
    };
    message?: InvoiceData;
};

export type RegisterVehicleState = {
    error?: {
        Placa?: string[];
        userID?: string[];
        TipoVehiculo?: string[];
        Tarifa?: string[];
    } | string;
    message?: string;
};

export type BillingData = {
    metodoDePago?: string;
    fechaHoraIngreso?: Date;
    fechaHoraSalida?: Date;
    formattedCurrency?: string;
    nombreTarifa?: string;
    placa?: string;
};

export type BillingState = {
    error?: string;
    message?: string;
};

export type Incident = {
    id: string;
    user_id: string;
    descripcion: string;
    fecha_hora_suceso: string;
};

export type IncidentPlate = {
    id: string;
    incident_id: string;
    placa: string;
};

export type BlackPlate = {
    user_id: string;
    placa: string;
}

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


export type ParkingFee = {
    id: string;
    user_id: string;
    week_days_id: string;
    nombre_tarifa: string;
    tipo_vehiculo: 'AUTOMOVIL' | 'CAMIONETA' | 'MOTOCICLETA' | 'BICICLETA';
    valor_hora: number;
    incremento_primer_hora: number;
    incremento_segunda_hora: number;
    valor_dia: number;
    cobrar_valor_dia_a_partir_minuto: number;
    primera_hora_a_partir_minuto: number;
    hora_adicional_a_partir_minuto: number;
    vigencia_desde: string;
    vigencia_hasta: string;
    exclusivo_mensualidad: boolean;
    exclusivo_administracion: boolean;
    tarifa_activa: boolean;
    nuevo_dia: 'NUEVO_DIA_CALENDARIO' | '24_HORAS' | '12_HORAS' | '8_HORAS';
};

export type ParkingFeeField = {
    id: string;
    nombre_tarifa: string;
};

export type WeekDays = {
    id: string;
    business_id: string;
    lunes: '1' | '0';
    martes: '1' | '0';
    miercoles: '1' | '0';
    jueves: '1' | '0';
    viernes: '1' | '0';
    sabado: '1' | '0';
    domingo: '1' | '0';
};

export type Stats = {

    id: string;
    timestamp: string;
    celdas_ocupadas_vehiculo: number;
    celdas_ocupadas_motocicleta: number;
    celdas_ocupadas_bicicleta: number;
    ocupacion_promedio: number;
    tiempo_medio_duracion: PostgresInterval; // PostresInterval object.
    rotacion_espacios: number;
    ingresos: number;
    nomina: number;
    imp_predial: number;
    servicios_publicos: number;
    mantenimiento: number;
    iva: number;
    otros: number;
};

export type AppContext = {
    celdas_ocupadas_vehiculo: number;
    celdas_ocupadas_motocicleta: number;
    celdas_ocupadas_bicicleta: number;
};

export type CardStats = {
    ocupacion_promedio: number;
    tiempo_medio_duracion: PostgresInterval; // PostresInterval object.
    rotacion_espacios: number;
    porcentaje_vehiculos_recurrentes: number | undefined;
};

export type ServiPark = {
    id: string;
    nombre: string;
    celdas: number;
    celdas_vehiculo: number;
    celdas_motocicleta: number;
    celdas_bicicleta: number;
    direccion: string;
};