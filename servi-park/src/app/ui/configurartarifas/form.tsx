'use client';

import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import CalendarDatePicker from '@/app/ui/calendardatepicker';
import { useState } from 'react';
import { createParkingFee } from '@/app/lib/actions';

export default function ConfigurarTarifasForm() {

    const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());

    return (
        <form action={createParkingFee}>
            <div className="rounded-md bg-gray-100 p-4">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between gap-2">
                        <div className="flex flex-col w-64">
                            <label className="md:text-md md:font-medium text-gray-950" htmlFor="NombreTarifa">Nombre Tarifa</label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="NombreTarifa"
                                        name="NombreTarifa"
                                        className="peer block w-full border rounded-md py-2 px-5 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500"
                                        placeholder="Nombre Tarifa" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="md:text-md md:font-medium text-gray-950" htmlFor="TipoVehiculo">Tipo Vehículo</label>
                            <div className="relative mt-2 rounded-md">
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
                        </div>
                        <div className="flex flex-col">
                            <label className="md:text-md md:font-medium text-gray-950" htmlFor="ValorHora">Valor Hora</label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        type="number"
                                        step={1}
                                        id="ValorHora"
                                        name="ValorHora"
                                        className="peer block w-full border rounded-md py-2 pr-5 pl-10 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500"
                                        placeholder="COP"
                                    />
                                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="md:text-md md:font-medium text-gray-950" htmlFor="IncrementoPrimerHora">Incremento 1er Hora</label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        type="number"
                                        step={1}
                                        id="IncrementoPrimerHora"
                                        name="IncrementoPrimerHora"
                                        className="peer block w-full border rounded-md py-2 pr-5 pl-10 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500"
                                        placeholder="COP"
                                    />
                                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="md:text-md md:font-medium text-gray-950" htmlFor="IncrementoSegundaHora">Incremento 2da Hora</label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        type="number"
                                        step={1}
                                        id="IncrementoSegundaHora"
                                        name="IncrementoSegundaHora"
                                        className="peer block w-full border rounded-md py-2 pr-5 pl-10 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500"
                                        placeholder="COP"
                                    />
                                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="md:text-md md:font-medium text-gray-950" htmlFor="ValorDia">Valor Día</label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        type="number"
                                        step={1}
                                        id="ValorDia"
                                        name="ValorDia"
                                        className="peer block w-full border rounded-md py-2 pr-5 pl-10 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500"
                                        placeholder="COP"
                                    />
                                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 mt-4">
                        <div className="container flex flex-row items-center" >
                            <label className="md:text-md md:font-medium text-gray-950 text-wrap w-44" htmlFor="FlagPrimeraHora" >Cobrar Primera Hora a Partir del Minuto</label>
                            <div className="relative rounded-md">
                                <div className="relative">
                                    <input
                                        type="number"
                                        step={1}
                                        id="FlagPrimeraHora"
                                        name="FlagPrimeraHora"
                                        className="peer w-12 border rounded-md py-2 px-2 mx-2 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500"
                                        placeholder="Min"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="container flex flex-row items-center" >
                            <label className="md:text-md md:font-medium text-gray-950 text-wrap w-48" htmlFor="FlagHoraAdicional" >Cobrar Hora Adicional a Partir del Minuto</label>
                            <div className="relative rounded-md">
                                <div className="relative">
                                    <input
                                        type="number"
                                        step={1}
                                        id="FlagHoraAdicional"
                                        name="FlagHoraAdicional"
                                        className="peer w-12 border rounded-md py-2 px-2 mx-2 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500"
                                        placeholder="Min"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="container flex flex-row items-center" >
                            <label className="md:text-md md:font-medium text-gray-950 text-wrap" htmlFor="VigenciaDesde">Vigencia Desde</label>
                            <div className="relative rounded-md">
                                <div className="relative">
                                    <div className="container border border-gray-200 rounded-md p-2 w-[200px] mx-2">
                                        <div className='!w-40 z-50' style={{ width: 160 }}>
                                            <CalendarDatePicker setSelectedDate={setSelectedDateStart} />
                                        </div>
                                        <input hidden id="VigenciaDesde" name="VigenciaDesde" value={selectedDateStart?.toISOString() || ''} readOnly></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container flex flex-row items-center" >
                            <label className="md:text-md md:font-medium text-gray-950 text-wrap" htmlFor="VigenciaHasta">Vigencia Hasta</label>
                            <div className="relative rounded-md">
                                <div className="relative">
                                    <div className="container border border-gray-200 rounded-md p-2 w-[200px] mx-2">
                                        <div className='!w-40 z-50' style={{ width: '160px' }}>
                                            <CalendarDatePicker setSelectedDate={setSelectedDateEnd} />
                                        </div>
                                        <input hidden id="VigenciaHasta" name="VigenciaHasta" value={selectedDateEnd?.toISOString() || ''} readOnly></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row mt-4 gap-4">
                        <fieldset className='min-w-fit'>
                            <div className='flex flex-row items-center gap-2 min-w-fit'>
                                <legend className="md:text-md md:font-medium text-gray-950 min-w-fit">
                                    Aplicar Tarifa los días
                                </legend>
                                <div className='flex flex-row rounded-md border border-gray-300 px-2 py-2 w-full gap-3'>
                                    <div className='container min-w-fit'>
                                        <input
                                            id='Lunes'
                                            name='Lunes'
                                            type='checkbox'
                                            className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                        />
                                        <label htmlFor='Lunes' className='mx-2 cursor-pointer'>
                                            Lunes
                                        </label>
                                    </div>
                                    <div className='container min-w-fit'>
                                        <input
                                            id='Martes'
                                            name='Martes'
                                            type='checkbox'
                                            className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                        />
                                        <label htmlFor='Martes' className='mx-2 cursor-pointer'>
                                            Martes
                                        </label>
                                    </div>
                                    <div className='container min-w-fit'>
                                        <input
                                            id='Miercoles'
                                            name='Miercoles'
                                            type='checkbox'
                                            className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                        />
                                        <label htmlFor='Miercoles' className='mx-2 cursor-pointer'>
                                            Miércoles
                                        </label>
                                    </div>
                                    <div className='container min-w-fit'>
                                        <input
                                            id='Jueves'
                                            name='Jueves'
                                            type='checkbox'
                                            className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                        />
                                        <label htmlFor='Jueves' className='mx-2 cursor-pointer'>
                                            Jueves
                                        </label>
                                    </div>
                                    <div className='container min-w-fit'>
                                        <input
                                            id='Viernes'
                                            name='Viernes'
                                            type='checkbox'
                                            className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                        />
                                        <label htmlFor='Viernes' className='mx-2 cursor-pointer'>
                                            Viernes
                                        </label>
                                    </div>
                                    <div className='container min-w-fit'>
                                        <input
                                            id='Sabado'
                                            name='Sabado'
                                            type='checkbox'
                                            className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                        />
                                        <label htmlFor='Sabado' className='mx-2 cursor-pointer'>
                                            Sábado
                                        </label>
                                    </div>
                                    <div className='container min-w-fit'>
                                        <input
                                            id='Domingo'
                                            name='Domingo'
                                            type='checkbox'
                                            className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                        />
                                        <label htmlFor='Domingo' className='mx-2 cursor-pointer'>
                                            Domingo
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className='flex flex-row gap-2 items-center'>
                            <label className="md:text-md md:font-medium text-gray-950" htmlFor="CobrarNuevoDiaCada">Cobrar nuevo dia cada</label>
                            <div className="relative rounded-md">
                                <div className="relative">
                                    <select
                                        id="CobrarNuevoDiaCada"
                                        name="CobrarNuevoDiaCada"
                                        className="peer block w-full cursor-pointer border rounded-md py-2 px-2 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500">
                                        <option value="" disabled>Seleccione una opcion</option>
                                        <option>Nuevo día calendario</option>
                                        <option>24 horas</option>
                                        <option>12 horas</option>
                                        <option>8 horas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row mt-4 justify-between'>
                        <div className='flex flex-row gap-3 items-center'>
                            <div className='container min-w-fit'>
                                <input
                                    id='ExclusivoMensualidad'
                                    name='ExclusivoMensualidad'
                                    type='checkbox'
                                    className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                />
                                <label htmlFor='ExclusivoMensualidad' className='mx-2 cursor-pointer'>
                                    Tarifa exclusiva para mensualidad
                                </label>
                            </div>
                            <div className='container min-w-fit'>
                                <input
                                    id='ExclusivoAdministracion'
                                    name='ExclusivoAdministracion'
                                    type='checkbox'
                                    className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                />
                                <label htmlFor='ExclusivoAdministracion' className='mx-2 cursor-pointer'>
                                    Tarifa exclusiva para administración
                                </label>
                            </div>
                            <div className='container min-w-fit'>
                                <input
                                    id='TarifaActiva'
                                    name='TarifaActiva'
                                    type='checkbox'
                                    className="w-3 h-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-950 focus:ring-2"
                                />
                                <label htmlFor='TarifaActiva' className='mx-2 cursor-pointer'>
                                    Tarifa activa
                                </label>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-neutral">Agregar Tarifa</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}