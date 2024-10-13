
export const formatCurrency = (amount: number) => {
    return (amount).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
    });
};

export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'es-CO',
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export const formatPostgresInterval = (interval: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}) => {
    // Format the interval values into a string
    const formattedDuration = `
      D:${interval.days || 0}, H:${interval.hours || 0}, M:${interval.minutes || 0}, S:${interval.seconds || 0}
    `;

    return formattedDuration;
};