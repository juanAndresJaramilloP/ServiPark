'use client';

import { ErrorAlert, SuccessAlert } from '@/app/ui/feedback';
import { useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import { User } from '@/app/lib/definitions';
import { updateEmployee } from '@/app/lib/actions';
import { useRef } from 'react';

export default function EditEmployeesModal({ empleado }: { empleado: User | false }) {

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const ref = useRef<HTMLFormElement>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent page refresh. Como esta dentro de un form, se previene el comportamiento por defecto del form.
        event.preventDefault();
        setDisabled(true);
        const form = new FormData(event.currentTarget);
        if (typeof empleado !== "boolean") {
            const {error, message} = await updateEmployee(form, empleado.id);
            setError(error);
            setSuccess(message);
            await new Promise((resolve) => setTimeout(() => {
                setSuccess('');
                setError('');
                resolve(null);
            }, 3000));
        }
        ref.current?.reset()
        setDisabled(false);
    };

    return (
        <div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box max-w-[550px] min-h-[500px] h-fit relative">
                    {error === undefined || error === '' ? (success && <SuccessAlert message={success} />) : <ErrorAlert message={error} />}
                    <h3 className={`${lusitana.className} font-bold text-xl mt-2`}>Editar Empleado: {typeof empleado !== "boolean" ? empleado.nombre_usuario : ''}</h3>
                    <p className={`${lusitana.className} text-md mt-2`}>Para cancelar, presione Esc o haga click fuera del cuadro.</p>
                    <form ref={ref} onSubmit={handleSubmit}>
                        <div className='flex flex-col mt-8 gap-4'>
                            <div className='flex flex-row items-center gap-2'>
                                <label className={`${lusitana.className} text-lg font-bold mr-4 w-20`} htmlFor='nombre'>Nombre:</label>
                                <input type="text" name="nombre" id="nombre" className="peer block rounded-md border border-gray-300 py-[9px] text-md text-center outline-2 placeholder:text-gray-500 min-w-60 w-fit" defaultValue={typeof empleado !== "boolean" ? empleado.nombre_usuario : ''} />
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <label className={`${lusitana.className} text-lg font-bold mr-4 w-20`} htmlFor='cargo'>Cargo:</label>
                                {/* <input type="text" name="cargo" id="cargo" className="peer block rounded-md border border-gray-300 py-[9px] text-md text-center outline-2 placeholder:text-gray-500 max-w-60" defaultValue={empleado.nombre_cargo} /> */}
                                <div className="relative rounded-md">
                                    <div className="relative">
                                        <select
                                            id="cargo"
                                            name="cargo"
                                            className="peer block w-fit min-w-60 cursor-pointer border rounded-md py-2 px-5 text-sm md:text-base border-gray-300 outline-2 placeholder:text-gray-500"
                                            defaultValue={typeof empleado !== "boolean" ? empleado.nombre_cargo : ''}>
                                            <option>EMPLEADO</option>
                                            <option>ADMINISTRADOR</option>
                                            <option>GERENTE</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <label className={`${lusitana.className} text-lg font-bold mr-4 w-20`} htmlFor='cedula'>Cédula:</label>
                                <input type="text" name="cedula" id="cedula" className="peer block rounded-md border border-gray-300 py-[9px] text-md text-center outline-2 placeholder:text-gray-500 min-w-60" defaultValue={typeof empleado !== "boolean" ? empleado.cedula : ''} />
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <label className={`${lusitana.className} text-lg font-bold mr-4 w-20`} htmlFor='celular'>Celular:</label>
                                <input type="text" name="celular" id="celular" className="peer block rounded-md border border-gray-300 py-[9px] text-md text-center outline-2 placeholder:text-gray-500 min-w-60" defaultValue={typeof empleado !== "boolean" ? empleado.celular : ''} />
                            </div>
                        </div>
                        <div className='absolute bottom-5 right-5'>
                            <button className="btn btn-neutral" disabled={disabled}>{disabled ? (<>Confirmando Cambios <span className="loading loading-dots loading-xs"></span></>) : "Confirmar"}</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );

}