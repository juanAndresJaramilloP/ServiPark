import Image from 'next/image';

export default function Page() {
    return (
        <div className="flex flex-col xl:flex-row gap-4 justify-center items-center">
            <div className="card bg-base-100 w-96 shadow-2xl">
                <div className='flex flex-row'>
                    <figure>
                        <Image
                            src="/toll.png"
                            className="rounded-xl"
                            alt={`Carro ingresando al parqueadero`}
                            width={208}
                            height={208}
                        />
                    </figure>
                    <div className='container p-4 bg-violet-950 rounded-xl place-content-center'>
                        <p className="text-sm md:text-2xl font-medium text-white text-center">Registrar Ingreso Vehículo</p>
                    </div>
                </div>
                <div className="card-body">
                    <form action="" className="space-y-3 h-[250px]">
                        <div className='flex flex-row justify-between items-center'>
                            <label className="text-lg md:text-2xl font-medium text-gray-950" htmlFor="placa">Placa</label>
                            <input className="peer block rounded-md border border-gray-200 py-[9px] text-base text-center outline-2 placeholder:text-gray-500" type="text" id="placa" name="placa" placeholder='AAA123' />
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <label className="text-lg md:text-2xl font-medium text-gray-950" htmlFor='tipovehiculo'>Tipo Vehículo</label>
                            <select className="block select select-bordered text-lg py-[9px]" defaultValue={"Automóvil"}>
                                <option>Automóvil</option>
                                <option>Motocicleta</option>
                            </select>
                        </div>
                        <div className="card-actions justify-end absolute bottom-8 right-8">
                            <button className="btn btn-primary">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}