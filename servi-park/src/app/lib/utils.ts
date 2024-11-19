
export const formatCurrency = (amount: number | undefined | string): string => {
    if (amount === undefined) {
        return 'N/A';
    }

    if (typeof amount === 'string') {
        amount = parseInt(amount);
        if (isNaN(amount)) {
            return 'N/A';
        }
    }

    const formattedAmount = amount.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formattedAmount;
};

export const formatCurrencyToNumber = (amount: string): number => {
    return parseInt(amount.replace(/[^0-9]/g, ''));
}

export const formatDateToLocale = (
    dateStr: string | undefined | null,
    locale: string = 'es-CO',
): string => {

    if (dateStr === undefined || dateStr === null) {
        return 'N/A';
    }

    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export const getCurrentLocalTimestampDate = (): Date => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Bogota', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);

    const year = parseInt(parts.find(part => part.type === 'year')?.value || '0', 10);
    const month = parseInt(parts.find(part => part.type === 'month')?.value || '0', 10) - 1; // months are 0-indexed in JS Date
    const day = parseInt(parts.find(part => part.type === 'day')?.value || '0', 10);
    const hour = parseInt(parts.find(part => part.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(part => part.type === 'minute')?.value || '0', 10);
    const second = parseInt(parts.find(part => part.type === 'second')?.value || '0', 10);

    return new Date(Date.UTC(year, month, day, hour, minute, second));
};

export const getCurrentLocalTimestampString = (): string => {
    return new Date().toLocaleString('en-US', { timeZone: 'America/Bogota', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

export const formatTimestampToLocale = (timestamp: string): Date => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Bogota', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);

    const year = parseInt(parts.find(part => part.type === 'year')?.value || '0', 10);
    const month = parseInt(parts.find(part => part.type === 'month')?.value || '0', 10) - 1; // months are 0-indexed in JS Date
    const day = parseInt(parts.find(part => part.type === 'day')?.value || '0', 10);
    const hour = parseInt(parts.find(part => part.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(part => part.type === 'minute')?.value || '0', 10);
    const second = parseInt(parts.find(part => part.type === 'second')?.value || '0', 10);

    return new Date(Date.UTC(year, month, day, hour, minute, second));
}

export const formatTimestampToLocaleString = (timestamp: Date | undefined): string => {
    if (timestamp === undefined || timestamp === null || timestamp.constructor.name !== 'Date') {
        return 'N/A';
    }

    const stringDate = timestamp.toISOString();
    const formattedStringDate = stringDate.replace('T', ' ').replace(/-/g, '/').split('.')[0];

    return formattedStringDate;
};

export const formatPostgresInterval = (interval: any) => {
    if (!interval || interval.constructor.name !== 'PostgresInterval') {
        return 'N/A';
    }

    // Extract values from the PostgresInterval object, defaulting to 0 if they’re undefined
    const days = interval.days || 0;
    const hours = interval.hours || 0;
    const minutes = interval.minutes || 0;
    const seconds = interval.seconds || 0;

    // Format the interval values into a string
    const formattedDuration = `${days} dias, ${hours} horas, ${minutes} min, ${seconds} seg`;
    return formattedDuration;
};

export const formatPostgresIntervalShort = (interval: any): string => {

    console.log("Interval: ",interval.constructor.name);

    if (!interval) {
        return 'N/A';
    }

    // Extract values from the PostgresInterval object, defaulting to 0 if they’re undefined
    const days = interval.days || 0;
    const hours = interval.hours || 0;
    const minutes = interval.minutes || 0;
    const seconds = interval.seconds || 0;

    // Format the interval values into a string
    const formattedDuration = `${days}D, ${hours}H, ${minutes}M`;
    return formattedDuration;
}

export const formatActiveDays = (daysString: string): string => {
    const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

    const activeDays = daysString
        .split("")
        .map((char, index) => (char === "1" ? daysOfWeek[index] : null))
        .filter(day => day !== null);

    return activeDays.join(", ");
};

export const formatBoolean = (value: boolean): string => {

    return value ? "Si" : "No";
};

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};

export const formatPercentage = (value: number | string): string => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    return `${numericValue.toFixed(1)}%`;
}

export const formatRotacionEspacios = (value: number | string): string => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    return `${numericValue.toFixed(1)} Veces x Dia`;
}

export const calculateValueToPay = (minutosEstadia: number, valorHora: number, incrementoPrimerHora: number, incrementoSegundaHora: number, valorDia: number, primeraHora: number, horaAdicional: number, cobrarDiaAPartirMin: number, nuevoDia: string): number => {
    let valorPagar: number = 0;
    if (minutosEstadia >= cobrarDiaAPartirMin) {
        const horasEstadia = minutosEstadia / 60;
        let minNuevoDia = 0;
        switch (nuevoDia) {
            case "NUEVO_DIA_CALENDARIO":
                if (horasEstadia <= 24) {
                    valorPagar = valorDia;
                } else {
                    valorPagar = valorDia * Math.floor(horasEstadia / 24);
                    const reminder = horasEstadia % 24;
                    if (reminder > 0) {
                        minNuevoDia = reminder * 60;
                        if (minNuevoDia >= cobrarDiaAPartirMin) {
                            valorPagar += valorDia;
                        } else if (minNuevoDia < 60) {
                            if (minNuevoDia >= primeraHora) {
                                valorPagar += valorHora;
                            }
                        } else if (minNuevoDia < 120) {
                            if ((minNuevoDia - 60) > horaAdicional) {
                                valorPagar += (valorHora + incrementoPrimerHora);
                            }
                        } else if (minNuevoDia < 180) {
                            if ((minNuevoDia - 120) > horaAdicional) {
                                valorPagar += (valorHora + incrementoPrimerHora + incrementoSegundaHora);
                            }
                        } else {
                            valorPagar += (valorHora * Math.floor(reminder));
                        }
                    }
                }
                break;
            case "24_HORAS":
                if (horasEstadia <= 24) {
                    valorPagar = valorDia;
                } else {
                    valorPagar = valorDia * Math.floor(horasEstadia / 24);
                    const reminder = horasEstadia % 24;
                    if (reminder > 0) {
                        minNuevoDia = reminder * 60;
                        if (minNuevoDia >= cobrarDiaAPartirMin) {
                            valorPagar += valorDia;
                        } else if (minNuevoDia < 60) {
                            if (minNuevoDia >= primeraHora) {
                                valorPagar += valorHora;
                            }
                        } else if (minNuevoDia < 120) {
                            if ((minNuevoDia - 60) > horaAdicional) {
                                valorPagar += (valorHora + incrementoPrimerHora);
                            }
                        } else if (minNuevoDia < 180) {
                            if ((minNuevoDia - 120) > horaAdicional) {
                                valorPagar += (valorHora + incrementoPrimerHora + incrementoSegundaHora);
                            }
                        } else {
                            valorPagar += (valorHora * Math.floor(reminder));
                        }
                    }
                }
                break;
            case "12_HORAS":
                if (horasEstadia <= 12) {
                    valorPagar = valorDia;
                } else {
                    valorPagar = valorDia * Math.floor(horasEstadia / 12);
                    const reminder = horasEstadia % 12;
                    if (reminder > 0) {
                        minNuevoDia = reminder * 60;
                        if (minNuevoDia >= cobrarDiaAPartirMin) {
                            valorPagar += valorDia;
                        } else if (minNuevoDia < 60) {
                            if (minNuevoDia >= primeraHora) {
                                valorPagar += valorHora;
                            }
                        } else if (minNuevoDia < 120) {
                            if ((minNuevoDia - 60) > horaAdicional) {
                                valorPagar += (valorHora + incrementoPrimerHora);
                            }
                        } else if (minNuevoDia < 180) {
                            if ((minNuevoDia - 120) > horaAdicional) {
                                valorPagar += (valorHora + incrementoPrimerHora + incrementoSegundaHora);
                            }
                        } else {
                            valorPagar += (valorHora * Math.floor(reminder));
                        }
                    }
                }
                break;
            case "8_HORAS":
                if (horasEstadia <= 8) {
                    valorPagar = valorDia;
                } else {
                    valorPagar = valorDia * Math.floor(horasEstadia / 8);
                    const reminder = horasEstadia % 8;
                    if (reminder > 0) {
                        minNuevoDia = reminder * 60;
                        if (minNuevoDia >= cobrarDiaAPartirMin) {
                            valorPagar += valorDia;
                        } else if (minNuevoDia < 60) {
                            if (minNuevoDia >= primeraHora) {
                                valorPagar += valorHora;
                            }
                        } else if (minNuevoDia < 120) {
                            if ((minNuevoDia - 60) > horaAdicional) {
                                valorPagar += (valorHora + incrementoPrimerHora);
                            }
                        } else if (minNuevoDia < 180) {
                            if ((minNuevoDia - 120) > horaAdicional) {
                                valorPagar += (valorHora + incrementoPrimerHora + incrementoSegundaHora);
                            }
                        } else {
                            valorPagar += (valorHora * Math.floor(reminder));
                        }
                    }
                }
                break;
        }

    } else if (minutosEstadia <= 60) { //caso < 1 hora
        if (minutosEstadia >= primeraHora) {
            valorPagar = valorHora;
        }
    } else if (minutosEstadia <= 120) { //caso 1 hora
        if ((minutosEstadia - 60) > horaAdicional) {
            valorPagar = valorHora + incrementoPrimerHora;
        } else {
            valorPagar = valorHora;
        }
    } else if (minutosEstadia <= 180) {
        if ((minutosEstadia - 120) > horaAdicional) {
            valorPagar = valorHora + incrementoPrimerHora + incrementoSegundaHora;
        } else {
            valorPagar = valorHora + incrementoPrimerHora;
        }
    } else {
        console.log("entro al ultimo else");
        valorPagar = valorHora * Math.ceil(minutosEstadia / 60);
    }
    return valorPagar;
}