import CalendarDatePicker from "@/app/ui/calendardatepicker";
import { lusitana } from "@/app/ui/fonts";

export function FeeTableRowSkeleton() {

    return (
        <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            {/* Nombre Tarifa */}
            <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
                <div className="skeleton h-6 w-24 rounded bg-gray-100"></div>
            </td>
            {/* Tipo Vehículo */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-32 rounded bg-gray-100"></div>
            </td>
            {/* Valor Hora */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Incremento 1er Hora */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-32 rounded bg-gray-100"></div>
            </td>
            {/* Incremento 2da Hora */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-32 rounded bg-gray-100"></div>
            </td>
            {/* Valor Día */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Gracia 1er Hora */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-32 rounded bg-gray-100"></div>
            </td>
            {/* Gracia Hora Adicional */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-32 rounded bg-gray-100"></div>
            </td>
            {/* Vigencia Desde */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Vigencia Hasta */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Aplicable Los Días */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-32 rounded bg-gray-100"></div>
            </td>
            {/* Exclusivo Mens. */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Exclusivo Admin. */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Tarifa Activa */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Cobro Nuevo Dia */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-32 rounded bg-gray-100"></div>
            </td>
        </tr>
    );
}

export function FeeTableSkeleton() {

    return (
        <div className="overflow-auto h-[250px] z-0">
            <table className="table table-zebra md:text-md table-pin-rows">
                <thead className='md:text-lg z-0'>
                    <tr>
                        <th>Nombre Tarifa</th>
                        <th>Tipo Vehículo</th>
                        <th>Valor Hora</th>
                        <th>Incremento 1er Hora</th>
                        <th>Incremento 2da Hora</th>
                        <th>Valor Día</th>
                        <th>Gracia 1er Hora</th>
                        <th>Gracia Hora Adicional</th>
                        <th>Vigencia Desde</th>
                        <th>Vigencia Hasta</th>
                        <th>Aplicable Los Días</th>
                        <th>Exclusivo Mens.</th>
                        <th>Exclusivo Admin.</th>
                        <th>Tarifa Activa</th>
                        <th>Cobro Nuevo Dia</th>
                    </tr>
                </thead>
                <tbody>
                    <FeeTableRowSkeleton />
                    <FeeTableRowSkeleton />
                    <FeeTableRowSkeleton />
                </tbody>
            </table>
        </div>
    );
}

export function HistorialTableSkeleton() {

    return (
        <div className="overflow-auto h-[500px]">
            <table className="table table-zebra text-lg table-pin-rows">
                <thead className='text-lg'>
                    <tr>
                        <th>Placa</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Tiempo</th>
                        <th>Tipo Vehiculo</th>
                        <th>Valor Base</th>
                        <th>IVA</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <HistorialTableRowSkeleton />
                    <HistorialTableRowSkeleton />
                    <HistorialTableRowSkeleton />
                    <HistorialTableRowSkeleton />
                    <HistorialTableRowSkeleton />
                    <HistorialTableRowSkeleton />
                    <HistorialTableRowSkeleton />
                </tbody>
            </table>
        </div>
    );
}

export function HistorialTableRowSkeleton() {

    return (
        <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            {/* Placa */}
            <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Entrada */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Salida */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Tiempo */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Tipo Vehiculo */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-32 rounded bg-gray-100"></div>
            </td>
            {/* Valor Base */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* IVA */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Total */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
        </tr>
    );
}

export function StatsCardSkeleton() {

    return (
        <div className="card bg-base-100 w-[550px] shadow-2xl">
            <div className="card-body">
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-row items-center justify-between'>
                        <label className="text-base md:text-lg font-medium text-gray-950">Ocupación Promedio</label>
                        <div className='flex flex-row items-center gap-2'>
                            <div className="tooltip" data-tip="Porcentaje promedio de espacios ocupados en el parqueadero durante un periodo específico.">
                                <button className="btn btn-ghost p-0 btn-square btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </button>
                            </div>
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center w-36 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">0%</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <label className="text-base md:text-lg font-medium text-gray-950">Tiempo Medio de Duración</label>
                        <div className='flex flex-row items-center gap-2'>
                            <div className="tooltip" data-tip="Tiempo promedio que un vehículo permanece estacionado en el parqueadero.">
                                <button className="btn btn-ghost p-0 btn-square btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </button>
                            </div>
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center w-36 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">0D 0H 0M</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <label className="text-base md:text-lg font-medium text-gray-950">Rotación de Espacios</label>
                        <div className='flex flex-row items-center gap-2'>
                            <div className="tooltip" data-tip=" Número promedio de veces que un espacio de estacionamiento es ocupado por diferentes vehículos en un periodo determinado.">
                                <button className="btn btn-ghost p-0 btn-square btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </button>
                            </div>
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center w-36 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">0 Veces x Dia</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <label className="text-base md:text-lg font-medium text-gray-950">% Vehiculos Recurrentes</label>
                        <div className='flex flex-row items-center gap-2'>
                            <div className="tooltip" data-tip=" Porcentaje de vehículos que utilizan el parqueadero en más de una ocasión en un periodo determinado.">
                                <button className="btn btn-ghost p-0 btn-square btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </button>
                            </div>
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center w-36 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">0%</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                        <p className={`${lusitana.className} md:text-xl font-bold text-gray-950`}>Filtros</p>
                    </div>
                    <form action={""}>
                        <div className='container'>
                            <div className='flex flex-row items-center justify-between'>
                                <label className="md:text-md font-medium text-gray-950" htmlFor='desde'>Desde</label>
                                <div className='flex flex-row items-center gap-2'>
                                    <p className='text-gray-500'>(mm/dd/aaaa)</p>
                                    <div className='container border border-gray-200 rounded-md p-2 w-[200px]'>
                                        <CalendarDatePicker setSelectedDate={(date: Date | null) => (date = new Date())} disabled={true} />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-between mt-4'>
                                <label className="md:text-md font-medium text-gray-950" htmlFor='hasta'>Hasta</label>
                                <div className='flex flex-row items-center gap-2'>
                                    <p className='text-gray-500'>(mm/dd/aaaa)</p>
                                    <div className='container border border-gray-200 rounded-md p-2 w-[200px]'>
                                        <CalendarDatePicker setSelectedDate={(date: Date | null) => (date = new Date())} disabled={true}/>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='flex flex-row items-center justify-between mt-4'>
                                <label className="md:text-md md:font-medium text-gray-950" htmlFor="TipoVehiculo">Tipo Vehículo</label>
                                <div className="relative rounded-md">
                                    <div className="relative">
                                        <select
                                            id="TipoVehiculo"
                                            name="TipoVehiculo"
                                            className="peer block w-full cursor-pointer border rounded-md py-2 px-5 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500">
                                            <option value="" disabled>Tipo Vehiculo</option>
                                            <option>Automóvil</option>
                                            <option>Camioneta</option>
                                            <option>Motocicleta</option>
                                            <option>Bicicleta</option>
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className='flex flex-row-reverse mt-4'>
                            <button className="btn btn-neutral"disabled={true}> "Consultar"</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

