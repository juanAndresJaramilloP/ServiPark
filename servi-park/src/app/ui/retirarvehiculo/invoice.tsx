import BillingModal from "@/app/ui/retirarvehiculo/billing-modal";
import { InvoiceDataState } from '@/app/lib/definitions';
import { formatTimestampToLocaleString } from "@/app/lib/utils";

export default function Invoice({ invoiceData }: { invoiceData: InvoiceDataState }) {

    const totalAPagar = (invoiceData.message ? invoiceData.message.formattedCurrency : "$ 0,00");
    const fechaHoraIngreso = (invoiceData.message ? invoiceData.message.fechaHoraIngreso : "N/A");
    const fechaHoraSalida = (invoiceData.message ? invoiceData.message.fechaHoraSalida : "N/A");
    const nombreTarifa = (invoiceData.message ? invoiceData.message.nombreTarifa : "N/A");

    return (
        <div className="container">
            <h2 className="card-title justify-center md:text-2xl">Total a Pagar</h2>
            <div className='container p-4 bg-slate-100 rounded-xl place-content-center border border-gray-300'>
                <p className="text-base md:text-4xl font-medium text-gray-950 text-center">{totalAPagar ? totalAPagar : "$ 0,00"}</p>
            </div>
            <div className='flex flex-col my-4 gap-6'>
                <div className='flex flex-row items-center justify-between'>
                    <label className="text-base md:text-lg font-medium text-gray-950">Ingreso</label>
                    <div className='container p-2 bg-slate-100 rounded-md place-content-center max-w-52 border border-gray-300'>
                        <p className="text-sm md:text-base font-medium text-gray-950 text-center">{fechaHoraIngreso === "N/A" ? fechaHoraIngreso : formatTimestampToLocaleString(fechaHoraIngreso)}</p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <label className="text-base md:text-lg font-medium text-gray-950">Salida</label>
                    <div className='container p-2 bg-slate-100 rounded-md place-content-center max-w-52 border border-gray-300'>
                        <p className="text-sm md:text-base font-medium text-gray-950 text-center">{fechaHoraSalida === "N/A" ? "N/A" : formatTimestampToLocaleString(fechaHoraSalida)}</p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <label className="text-base md:text-lg font-medium text-gray-950">Tarifa</label>
                    <div className='container p-2 bg-slate-100 rounded-md place-content-center max-w-52 border border-gray-300'>
                        <p className="text-sm md:text-base font-medium text-gray-950 text-center">{nombreTarifa ? nombreTarifa : "N/A"}</p>
                    </div>
                </div>
            </div>
            <div className="card-actions justify-end">
                <BillingModal invoiceData={invoiceData} />
            </div>
        </div>
    );
}