'use client';

import DigitarPlacaForm from "@/app/ui/retirarvehiculo/form";
import Invoice from "@/app/ui/retirarvehiculo/invoice";
import { useState } from "react";
import { InvoiceDataState } from '@/app/lib/definitions';
import { ErrorAlert, SuccessAlert } from "@/app/ui/feedback";

export default function Page() {

    const [invoiceData, setInvoiceData] = useState<InvoiceDataState>({
        message: {
            fechaHoraIngreso: undefined,
            fechaHoraSalida: undefined,
            formattedCurrency: '',
            nombreTarifa: '',
            placa: ''
        }
    });

    return (
        <div className="flex flex-col items-center">
            <div className="fixed top-32 container max-w-2xl">
                { invoiceData.errors?.Placa?.[0] && <ErrorAlert message={invoiceData.errors.Placa[0]} />}
            </div>
            <div className="flex flex-col xl:flex-row gap-14 xl:gap-44 justify-center items-center">
                <DigitarPlacaForm setInvoiceData={setInvoiceData} />
                <div className="card bg-base-100 w-[400px] shadow-2xl">
                    <div className="card-body gap-6">
                        <Invoice invoiceData={invoiceData} />
                    </div>
                </div>
            </div>
        </div>

    );
}