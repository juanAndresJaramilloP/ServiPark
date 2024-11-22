import Image from 'next/image';
import RegisterVehicleForm from '@/app/ui/registrarvehiculo/form';
import { fetchActiveParkingFeesList } from '@/app/lib/data';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await getServerSession(options);
    if (!session) {
        redirect('/api/auth/signin');
    }

    const userID = session.user.id;
    const fees = await fetchActiveParkingFeesList()

    
    return (
        <div className="flex flex-col xl:flex-row gap-4 justify-center items-center">
            <div className="card bg-base-100 w-[580px] shadow-2xl">
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
                    <RegisterVehicleForm parkingFees={fees} userID={userID} />
                </div>
            </div>
        </div>
    );
}