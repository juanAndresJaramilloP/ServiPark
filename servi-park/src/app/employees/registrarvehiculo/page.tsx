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
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}