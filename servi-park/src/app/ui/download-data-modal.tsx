'use client';

import CalendarDatePicker from '@/app/ui/calendardatepicker';
import { formatDateToLocal } from '@/app/lib/utils';
import { ErrorAlert } from '@/app/ui/feedback';
import { useState } from "react";
import { lusitana } from "./fonts";

export default function DownloadDataModal() {

    const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Prevent page refresh. Como esta dentro de un form, se previene el comportamiento por defecto del form.
        event.preventDefault();
        setDisabled(true);
        
        if (!selectedDateStart || !selectedDateEnd) {
            alert('Please enter both start and end dates.');
            return;
        }

        // Send request to the API with date range parameters
        const response = await fetch(`/api/downloadcsv?startDate=${selectedDateStart?.toISOString()}&endDate=${selectedDateEnd?.toISOString()}`);

        const formattedStartDate = formatDateToLocal(selectedDateStart?.toISOString());
        const formattedEndDate = formatDateToLocal(selectedDateEnd?.toISOString());
        
        const fileName = `historico_${formattedStartDate}_${formattedEndDate}.csv`;


        if (response.ok) {
            // Create a Blob from the CSV file
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}`);
            document.body.appendChild(link);
            link.click();

            // Clean up
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
            setError('');
        } else {
            const data = await response.json();
            setError(data.message);
            console.error('Failed to download the CSV file. Message:', data.message);
        }

        setDisabled(false);

    };


    return (
        <div>
            <button className="btn btn-lg bg-yellow-600 hover:bg-yellow-700 rounded-xl text-white text-base max-w-52 h-fit" onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}>Descargar Datos Por Rango de Fechas</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box max-w-2xl h-3/5 relative">
                    { error && <ErrorAlert message={error} />}
                    <h3 className={`${lusitana.className} font-bold text-xl`}>Descargar Registro Histórico</h3>
                    <p className={`${lusitana.className} text-md `}>Seleccione el rango de fechas para descargar el registro histórico de ingresos.</p>
                    <p className={`${lusitana.className} text-md mt-2`}>Para cancelar, presione Esc o haga click fuera del cuadro.</p>
                    <form>
                        <div className='flex flex-row items-center justify-between mt-8'>
                            <div className='flex flex-row items-center gap-1'>
                                <label className="text-base md:text-lg font-medium text-gray-950 mr-4">Desde</label>
                                <div className='container border border-gray-200 rounded-md p-2 w-[200px]'>
                                    <CalendarDatePicker setSelectedDate={setSelectedDateStart} />
                                </div>
                            </div>
                            <div className='flex flex-row items-center gap-1'>
                                <label className="text-base md:text-lg font-medium text-gray-950 mr-4">Hasta</label>
                                <div className='container border border-gray-200 rounded-md p-2 w-[200px]'>
                                    <CalendarDatePicker setSelectedDate={setSelectedDateEnd} />
                                </div>
                            </div>
                        </div>
                        <div className=' absolute bottom-5 
                        right-5'>
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