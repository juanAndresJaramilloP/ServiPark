'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function DigitarPlacaForm() {

    

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    }

    return (
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
    );
}