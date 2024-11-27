'use client';

import { useVariables } from "../context/ParkingState";
import Image from 'next/image';

export default function FooterStats() {

    const { celdas_ocupadas_vehiculo, celdas_ocupadas_motocicleta, celdas_ocupadas_bicicleta } = useVariables();

    console.log("DEBUG celdas_ocupadas_vehiculo: ", celdas_ocupadas_vehiculo);

    return (
        <div className="flex flex-row items-center gap-14 mr-12">
            <div className="flex flex-row gap-4 items-center">
                <Image
                    src="/car.png"
                    className=" min-w-8"
                    alt="carro"
                    width={52}
                    height={36}
                />
                <p className="text-2xl font-medium text-gray-900">{celdas_ocupadas_vehiculo}</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Image
                    src="/motorcycle.png"
                    className=" min-w-8"
                    alt="moto"
                    width={36}
                    height={36}
                />
                <p className="text-2xl font-medium text-gray-900">{celdas_ocupadas_motocicleta}</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Image
                    src="/bicycle.png"
                    className=" min-w-8"
                    alt="bicicleta"
                    width={36}
                    height={36}
                />
                <p className="text-2xl font-medium text-gray-900">{celdas_ocupadas_bicicleta}</p>
            </div>
        </div>
    );
}