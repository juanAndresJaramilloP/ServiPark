'use client';

import { registerVehicle } from '@/app/lib/actions';
import { fetchOcupationalContext } from '@/app/lib/data';
import { ParkingFeeField, RegisterVehicleState } from '@/app/lib/definitions';
import { useVariables } from '@/app/context/ParkingState';
import { useState } from 'react';

export default function RegisterVehicleForm({ parkingFees, userID }: { parkingFees: ParkingFeeField[], userID: string }) {

    const [disabled, setDisabled] = useState(false);
    const { setCeldas_ocupadas_vehiculo, setCeldas_ocupadas_motocicleta, setCeldas_ocupadas_bicicleta } = useVariables();
    const [vehicleRegistrationState, setVehicleRegistrationState] = useState<RegisterVehicleState>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);

        const form = new FormData(e.currentTarget);
        const state = await registerVehicle(form);
        setVehicleRegistrationState(state);
        setDisabled(false);

        const context = await fetchOcupationalContext();
        setCeldas_ocupadas_vehiculo(context.celdas_ocupadas_vehiculo);
        setCeldas_ocupadas_motocicleta(context.celdas_ocupadas_motocicleta);
        setCeldas_ocupadas_bicicleta(context.celdas_ocupadas_bicicleta);

        await new Promise((resolve) => setTimeout(() => {
            setVehicleRegistrationState(undefined);
            resolve(null);
        }, 2500));
    }

    const showState = () => {
        if (vehicleRegistrationState) {
            if (vehicleRegistrationState.error) {
                if (typeof vehicleRegistrationState.error === 'string') {
                    return <div className="text-red-500 text-xl font-semibold text-wrap">{vehicleRegistrationState.error}</div>
                } else {
                    if (vehicleRegistrationState.error.Placa) {
                        return <div className="text-red-500 text-xl font-semibold text-wrap">Placa: {vehicleRegistrationState.error.Placa}</div>
                    } else if (vehicleRegistrationState.error.TipoVehiculo) {
                        return <div className="text-red-500 text-xl font-semibold text-wrap">Tipo Vehiculo: {vehicleRegistrationState.error.TipoVehiculo}</div>
                    } else if (vehicleRegistrationState.error.Tarifa) {
                        return <div className="text-red-500 text-xl font-semibold text-wrap">Tarifa: {vehicleRegistrationState.error.Tarifa}</div>
                    } else {
                        return <div className="text-red-500 text-xl font-semibold text-wrap">Error</div>
                    }
                }
            } else {
                return <div className="text-green-500 text-xl">{vehicleRegistrationState.message}</div>
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 h-[300px]">
            <div className='flex flex-row place-content-center'>
                {showState()}
            </div>
            <input hidden id='userID' name="userID" value={userID} />
            <div className='flex flex-row justify-between items-center'>
                <label className="text-xl font-medium text-gray-950" htmlFor="Placa">Placa</label>
                <input className="peer block w-40 rounded-md border border-gray-300 py-[9px] text-base text-center outline-2 placeholder:text-gray-500" type="text" id="Placa" name="Placa" placeholder='AAA123' />
            </div>
            <div className='flex flex-row justify-between items-center'>
                <label className="text-xl font-medium text-gray-950" htmlFor='TipoVehiculo'>Tipo Vehículo</label>
                <select
                    id="TipoVehiculo"
                    name="TipoVehiculo"
                    className="peer block w-40 cursor-pointer border rounded-md py-2 px-2 text-lg text-wrap border-gray-300 outline-2 placeholder:text-gray-500">
                    <option disabled>Tipo Vehiculo</option>
                    <option>Automóvil</option>
                    <option>Camioneta</option>
                    <option>Motocicleta</option>
                    <option>Bicicleta</option>
                </select>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <label className="text-xl font-medium text-gray-950" htmlFor='Tarifa'>Tarifa</label>
                <select
                    id="Tarifa"
                    name="Tarifa"
                    className="peer block max-w-[400px] cursor-pointer border rounded-md py-2 px-2 text-lg text-wrap border-gray-300 outline-2 placeholder:text-gray-500">
                    <option value="" disabled>Seleccione la tarifa</option>
                    {parkingFees.map((fee) => (
                        <option key={fee.id} value={fee.id}>{fee.nombre_tarifa}</option>
                    ))}
                </select>
            </div>
            <div className="card-actions justify-end absolute bottom-8 right-8">
                <button className="btn btn-primary text-lg" disabled={disabled} >{disabled ? (<>Ingresando <span className="loading loading-dots loading-xs"></span></>) : "Ingresar Vehículo"}</button>
            </div>
        </form>
    );

}