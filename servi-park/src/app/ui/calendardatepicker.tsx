'use client'

import { useState } from "react";
import DatePicker from "react-datepicker";
import { es } from 'date-fns/locale/es';
import { registerLocale, setDefaultLocale } from "react-datepicker";
registerLocale('es', es);
setDefaultLocale('es');

import "react-datepicker/dist/react-datepicker.css";

interface CalendarDatePickerProps {
    setSelectedDate: (date: Date | null) => void;
}

export default function CalendarDatePicker(
    {
        setSelectedDate,
        disabled = false
    }: CalendarDatePickerProps & { disabled?: boolean }
) {

    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);  // Update local state
        setSelectedDate(date);  // Update parent state
    };

    return (
        <DatePicker disabled={disabled} locale={"es"} selected={startDate} onChange={(date) => handleDateChange(date)} />
    );
}