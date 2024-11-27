'use client';

import { ErrorAlert, SuccessAlert } from '@/app/ui/feedback';
import { useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import { registerPayment } from '@/app/lib/actions';
import { fetchOcupationalContext } from '@/app/lib/data';
import { InvoiceDataState, BillingState, BillingData } from '@/app/lib/definitions';
import { useVariables } from '@/app/context/ParkingState';


export default function BillingModal({ invoiceData }: { invoiceData: InvoiceDataState }) {

    const { setCeldas_ocupadas_vehiculo, setCeldas_ocupadas_motocicleta, setCeldas_ocupadas_bicicleta } = useVariables();
    const [disabled, setDisabled] = useState(false);
    const [billingState, setBillingState] = useState<BillingState>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisabled(true);
        const form = new FormData(event.currentTarget);
        const rawForm = Object.fromEntries(form.entries());
        // Merge form data with invoiceData
        const combinedData: BillingData = {
            ...rawForm,
            ...(invoiceData.message ? invoiceData.message : {})
        };

        const state = await registerPayment(combinedData);
        setBillingState(state);
        setDisabled(false);

        const context = await fetchOcupationalContext();
        setCeldas_ocupadas_vehiculo(context.celdas_ocupadas_vehiculo);
        setCeldas_ocupadas_motocicleta(context.celdas_ocupadas_motocicleta);
        setCeldas_ocupadas_bicicleta(context.celdas_ocupadas_bicicleta);
    };


    return (
        <div>
            <button className="btn btn-primary text-xl" onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement)?.showModal()} disabled={invoiceData.errors !== undefined || invoiceData.message?.fechaHoraIngreso === undefined}>Facturar</button>
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box max-w-xl h-3/6 relative">
                    {billingState && (billingState.message ? (<SuccessAlert message={billingState.message} />) : <ErrorAlert message={billingState.error ?? 'Error'} />)}
                    <h3 className={`${lusitana.className} font-bold text-3xl`}>Facturar</h3>
                    <p className={`${lusitana.className} text-xl mt-2`}>Para cancelar, presione Esc o haga click fuera del cuadro.</p>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-row justify-between items-center mt-8'>
                            <label className="text-xl font-medium text-gray-950" htmlFor='metodoDePago'>Seleccione el método de pago</label>
                            <select
                                id="metodoDePago"
                                name="metodoDePago"
                                className="peer block w-40 cursor-pointer border rounded-md py-2 px-2 text-lg text-wrap border-gray-300 outline-2 placeholder:text-gray-500"
                                required
                                >
                                <option value="" disabled>Metodo de Pago</option>
                                <option>Contado</option>
                                <option>Tarjeta</option>
                            </select>
                        </div>
                        <div className='absolute bottom-5 right-5'>
                            <button className="btn btn-lg btn-neutral text-xl" disabled={disabled}>{disabled ? (<>Registrando pago <span className="loading loading-dots loading-xs"></span></>) : "Facturar"}</button>
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