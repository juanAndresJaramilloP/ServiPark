import Image from 'next/image';
import CalendarDatePicker from '@/app/ui/calendardatepicker'

export default function Page() {
    return (
        <div className="flex flex-col xl:flex-row gap-14 xl:gap-44 justify-center items-center">
            <div className='flex flex-col gap-8'>
                <div className="card lg:card-side bg-base-200 shadow-2xl max-w-[450px]">
                    <figure className="pl-4 py-4">
                        <Image
                            src="/history.png"
                            className="rounded-xl"
                            alt="simbolo de historial"
                            width={100}
                            height={100}
                        />
                    </figure>
                    <div className="card-body items-center justify-center">
                        <div className="card-actions">
                            <button className="btn btn-lg bg-yellow-600 hover:bg-yellow-700 rounded-xl text-white text-base max-w-52 h-fit">Consultar Ingresos por Rango de Fechas</button>
                        </div>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-200 shadow-2xl max-w-[450px]">
                    <figure className="pl-4 py-4">
                        <Image
                            src="/money.png"
                            className="rounded-xl"
                            alt="simbolo de historial"
                            width={100}
                            height={100}
                        />
                    </figure>
                    <div className="card-body items-center justify-center">
                        <div className="card-actions">
                            <button className="btn btn-lg bg-green-700 hover:bg-green-800 rounded-xl text-white text-base max-w-52 h-fit">Consultar Ingresos por Rango de Fechas</button>
                        </div>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-200 shadow-2xl max-w-[450px]">
                    <figure className="pl-4 py-4">
                        <Image
                            src="/updateToll.png"
                            className="rounded-xl"
                            alt="simbolo de historial"
                            width={100}
                            height={100}
                        />
                    </figure>
                    <div className="card-body items-center justify-center">
                        <div className="card-actions">
                            <button className="btn btn-lg bg-blue-800 hover:bg-blue-950 rounded-xl text-white text-base max-w-52 h-fit">Consultar Ingresos por Rango de Fechas</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 w-[550px] shadow-2xl">
                <div className="card-body gap-6">
                    <div className='flex flex-col mt-4 gap-6'>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950">Ocupación Promedio</label>
                            <div className='flex flex-row items-center gap-2'>
                                <div className="tooltip" data-tip="hello">
                                    <button className="btn btn-ghost p-0 btn-square btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='container p-2 bg-slate-100 rounded-md place-content-center w-36 border border-gray-300'>
                                    <p className="text-sm md:text-base font-medium text-gray-950 text-center">90%</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950">Tiempo Medio de Duración</label>
                            <div className='flex flex-row items-center gap-2'>
                                <div className="tooltip" data-tip="hello">
                                    <button className="btn btn-ghost p-0 btn-square btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='container p-2 bg-slate-100 rounded-md place-content-center w-36 border border-gray-300'>
                                    <p className="text-sm md:text-base font-medium text-gray-950 text-center">2 H + 5 min</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950">Rotación de Espacios</label>
                            <div className='flex flex-row items-center gap-2'>
                                <div className="tooltip" data-tip="hello">
                                    <button className="btn btn-ghost p-0 btn-square btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='container p-2 bg-slate-100 rounded-md place-content-center w-36 border border-gray-300'>
                                    <p className="text-sm md:text-base font-medium text-gray-950 text-center">3,4 Veces x Dia</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950">% Vehiculos Recurrentes</label>
                            <div className='flex flex-row items-center gap-2'>
                                <div className="tooltip" data-tip="hello">
                                    <button className="btn btn-ghost p-0 btn-square btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='container p-2 bg-slate-100 rounded-md place-content-center w-36 border border-gray-300'>
                                    <p className="text-sm md:text-base font-medium text-gray-950 text-center">90%</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                            </svg>
                            <p className='text-sm md:text-base font-medium text-gray-950'>Filtros</p>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950" htmlFor='desde'>Desde</label>
                            <div className='flex flex-row items-center gap-2'>
                                <p className='text-gray-500'>(dd/mm/aaaa)</p>
                                <CalendarDatePicker />
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950" htmlFor='hasta'>Hasta</label>
                            <div className='flex flex-row items-center gap-2'>
                                <p className='text-gray-500'>(dd/mm/aaaa)</p>
                                <CalendarDatePicker />
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950" htmlFor='tipovehiculo'>Tipo Vehículo</label>
                            <select className="block select select-bordered border-gray-200 text-lg py-[9px]" defaultValue={"Automóvil"} id='tipovehiculo'>
                                <option>Automóvil</option>
                                <option>Motocicleta</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}