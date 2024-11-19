'use client';

import Image from 'next/image';
import { useState } from "react";
import { generateInvoiceForVehicle } from '@/app/lib/data';
import { inter } from '../fonts';
import {InvoiceDataState} from '@/app/lib/definitions';

interface DigitarPlacaInvoiceData {
    setInvoiceData: (data: InvoiceDataState) => void;
}

export default function DigitarPlacaForm({setInvoiceData}:DigitarPlacaInvoiceData) {

    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisabled(true);

        const form = new FormData(event.currentTarget);
        const state = await generateInvoiceForVehicle(form);
        setInvoiceData(state);
        console.log("DigitarPlacaForm state: ", state);
        
        setDisabled(false);
    };

    return (
        <div className="card bg-base-100 w-[450px] shadow-2xl">
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
                <form  onSubmit={handleSubmit} className="space-y-3 ">
                    <div className='flex flex-col items-center gap-4'>
                        <label className="text-lg md:text-2xl font-medium text-gray-950" htmlFor="Placa">Digita la Placa</label>
                        <div className='join'>
                            <input className="peer block rounded-md border border-gray-300 py-[9px] text-lg text-center outline-2 placeholder:text-gray-500 join-item" type="text" id="Placa" name="Placa" placeholder='AAA123' />
                            <div className="card-actions">
                                <button className="btn btn-primary join-item" disabled={disabled}>{disabled ? (<>Buscando Vehículo <span className="loading loading-dots loading-xs"></span></>) : "Buscar"}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}