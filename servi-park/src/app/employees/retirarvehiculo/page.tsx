import Image from 'next/image';

export default function Page() {
    return (
        <div className="flex flex-col xl:flex-row gap-14 xl:gap-44 justify-center items-center">
            <div className="card bg-base-100 w-96 shadow-2xl">
                <div className='flex flex-row'>
                    <figure>
                        <Image
                            src="/exit.png"
                            className="rounded-xl"
                            alt={`Carro ingresando al parqueadero`}
                            width={208}
                            height={208}
                        />
                    </figure>
                    <div className='container p-4 bg-blue-600 rounded-xl place-content-center'>
                        <p className="text-sm md:text-2xl font-medium text-white text-center">Registrar Salida Vehículo</p>
                    </div>
                </div>
                <div className="card-body">
                    <form action="" className="space-y-3 ">
                        <div className='flex flex-col items-center gap-4'>
                            <label className="text-lg md:text-2xl font-medium text-gray-950" htmlFor="placa">Digita la Placa</label>
                            <div className='join'>
                                <input className="peer block rounded-md border border-gray-300 py-[9px] text-lg text-center outline-2 placeholder:text-gray-500 join-item" type="text" id="placa" name="placa" placeholder='AAA123' />
                                <div className="card-actions">
                                    <button className="btn btn-primary join-item">Ingresar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card bg-base-100 w-[400px] shadow-2xl">
                <div className="card-body gap-6">
                    <h2 className="card-title justify-center md:text-2xl">Total a Pagar</h2>
                    <div className='container p-4 bg-slate-100 rounded-xl place-content-center border border-gray-300'>
                        <p className="text-base md:text-4xl font-medium text-gray-950 text-center">{"$9,000"}</p>
                    </div>
                    <div className='flex flex-col mt-4 gap-6'>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950">Ingreso</label>
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center max-w-52 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">{new Date().toLocaleString()}</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950">Salida</label>
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center max-w-52 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">{new Date().toLocaleString()}</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950">Tarifa</label>
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center max-w-52 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">{"Estándar"}</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <label className="text-base md:text-lg font-medium text-gray-950">Método Pago</label>
                            <div className='container p-2 bg-slate-100 rounded-md place-content-center max-w-52 border border-gray-300'>
                                <p className="text-sm md:text-base font-medium text-gray-950 text-center">{"Contado"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Facturar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}