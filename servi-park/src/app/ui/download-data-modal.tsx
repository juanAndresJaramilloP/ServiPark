'use client';

import CalendarDatePicker from '@/app/ui/calendardatepicker';
import { formatDateToLocale } from '@/app/lib/utils';
import { ErrorAlert, SuccessAlert } from '@/app/ui/feedback';
import { useState } from "react";
import { lusitana } from "@/app/ui/fonts";

export default function DownloadDataModal() {

    const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Prevent page refresh. Como esta dentro de un form, se previene el comportamiento por defecto del form.
        event.preventDefault();
        setDisabled(true);

        if (!selectedDateStart || !selectedDateEnd) {
            alert('Por favor ingrese ambas fechas');
            setDisabled(false);
            return;
        }

        // Send request to the API with date range parameters
        const response = await fetch(`/api/downloadcsv?startDate=${selectedDateStart?.toISOString()}&endDate=${selectedDateEnd?.toISOString()}`);

        const formattedStartDate = formatDateToLocale(selectedDateStart?.toISOString());
        const formattedEndDate = formatDateToLocale(selectedDateEnd?.toISOString());

        const fileName = `Historico_${formattedStartDate}-${formattedEndDate}.csv`;

        if (response.ok) {
            // Create a Blob from the CSV file
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link programatically to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}`);
            document.body.appendChild(link);
            link.click();

            // Clean up
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
            setError('');
            setSuccess(true);
            await new Promise((resolve) => setTimeout(() => {
                setSuccess(false);
                resolve(null);
            }, 2000));

        } else {
            const data = await response.json();
            setError(data.message);
            await new Promise((resolve) => setTimeout(() => {
                setError('');
                resolve(null);
            }, 2000));
            console.error('Failed to download the CSV file. Message:', data.message);
        }

        setDisabled(false);

    };


    return (
        <div>
            <button className="btn btn-lg bg-yellow-600 hover:bg-yellow-700 rounded-xl text-white text-base max-w-52 h-fit" onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}>Descargar Datos Por Rango de Fechas</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box max-w-[610px] h-[520px] relative">
                    {error === '' ? (success && <SuccessAlert message='Descarga Exitosa!' />) : <ErrorAlert message={error} />}
                    <h3 className={`${lusitana.className} font-bold text-xl`}>Descargar Registro Histórico</h3>
                    <p className={`${lusitana.className} text-md `}>Seleccione el rango de fechas para descargar el registro histórico de ingresos.</p>
                    <p className={`${lusitana.className} text-md mt-2`}>Para cancelar, presione Esc o haga click fuera del cuadro.</p>
                    <form>
                        <div className='flex flex-row items-center gap-20 mt-8'>
                            <div className='flex flex-row items-center gap-1'>
                                <label className="text-base md:text-lg font-medium text-gray-950 mr-4">Desde</label>
                                <CalendarDatePicker setSelectedDate={setSelectedDateStart} />
                            </div>
                            <div className='flex flex-row items-center gap-1'>
                                <label className="text-base md:text-lg font-medium text-gray-950 mr-4">Hasta</label>
                                <CalendarDatePicker setSelectedDate={setSelectedDateEnd} />
                            </div>
                        </div>
                        <div className='absolute bottom-5 right-5'>
                            <button className="btn btn-neutral" onClick={handleSubmit} disabled={disabled}>{disabled ? (<>Descargando <span className="loading loading-dots loading-xs"></span></>) : "Descargar CSV"}</button>
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