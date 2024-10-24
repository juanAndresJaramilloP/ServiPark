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
        // <div className="container border border-gray-200 rounded-md p-2 w-[205px]">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        //* </div> */}
    );
}