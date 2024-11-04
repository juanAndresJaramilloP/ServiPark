export const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) {
        return 'N/A';
    }
    return (amount).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
    });
};

export const formatDateToLocal = (
    dateStr: string | undefined | null,
    locale: string = 'es-CO',
) => {

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
