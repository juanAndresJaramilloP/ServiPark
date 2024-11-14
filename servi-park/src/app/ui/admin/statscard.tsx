'use client';

import { lusitana } from '@/app/ui/fonts';
import { formatPercentage, formatRotacionEspacios, formatPostgresIntervalShort } from "@/app/lib/utils";
import CalendarDatePicker from "@/app/ui/calendardatepicker";
import { CardStats } from '@/app/lib/definitions';
import { useState } from "react";

interface StatsCardProps {
    setError: (error: string) => void;
}

export default function StatsCard({ setError }: StatsCardProps) {

    const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());
    const [disabled, setDisabled] = useState(false);
    const [stats, setStats] = useState<CardStats | undefined>();


    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Prevent page refresh. Como esta dentro de un form, se previene el comportamiento por defecto del form.
        event.preventDefault();
        setDisabled(true);

        if (!selectedDateStart || !selectedDateEnd) {
            alert('Por favor ingrese ambas fechas');
            setDisabled(false);
            return;
        }

        const response = await fetch(`/api/downloadstats?startDate=${selectedDateStart?.toISOString()}&endDate=${selectedDateEnd?.toISOString()}`);

        if (response.ok) {
            const fetchedStats = await response.json();
            setStats(fetchedStats);
            setDisabled(false);
        } else {
            const data = await response.json();
            setError(data.message);
            console.error('Failed to download statistics data. Message:', data.message);
            await new Promise((resolve) => setTimeout(() => {
                setError('');
                resolve(null);
            }, 3000));
            setDisabled(false);
        }
    }

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
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center w-44 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">{stats?.ocupacion_promedio ? formatPercentage(stats.ocupacion_promedio) : "0%"}</p>
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
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center w-44 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">{stats?.tiempo_medio_duracion ? formatPostgresIntervalShort(stats.tiempo_medio_duracion) : "N/A"}</p>
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
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center w-44 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">{stats?.rotacion_espacios_prom_dia ? formatRotacionEspacios(stats.rotacion_espacios_prom_dia) : "0 Veces x Dia"}</p>
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
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center w-44 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">{stats?.porc_vehiculos_recurrentes ? formatPercentage(stats.porc_vehiculos_recurrentes) : "0%"}</p>
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
                                        <CalendarDatePicker setSelectedDate={setSelectedDateStart} />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-between mt-4'>
                                <label className="md:text-md font-medium text-gray-950" htmlFor='hasta'>Hasta</label>
                                <div className='flex flex-row items-center gap-2'>
                                    <p className='text-gray-500'>(mm/dd/aaaa)</p>
                                    <div className='container border border-gray-200 rounded-md p-2 w-[200px]'>
                                        <CalendarDatePicker setSelectedDate={setSelectedDateEnd} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='flex flex-row-reverse'>
                        <button className="btn btn-neutral" onClick={handleSubmit} disabled={disabled}>{disabled ? (<>Consultando <span className="loading loading-dots loading-xs"></span></>) : "Consultar"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}