'use client'

import { useState } from "react";
import DatePicker from "react-datepicker";
import { es } from 'date-fns/locale/es';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
registerLocale('es', es);
setDefaultLocale('es');

import "react-datepicker/dist/react-datepicker.css";


export default function CalendarDatePicker() {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    return (
        // <div className='relative flex flex-row'>
        //     <div className='absolute top-2 left-[172px] z-50'>
        //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        //             <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 5.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        //         </svg>
        //     </div>
        //     <div className='relative z-40'>
        //         <div className="container border border-gray-200 rounded-md p-2">
        //             <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        //         </div>
        //     </div>
        // </div>
        <div className="container border border-gray-200 rounded-md p-2 w-[205px]">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
    );
}