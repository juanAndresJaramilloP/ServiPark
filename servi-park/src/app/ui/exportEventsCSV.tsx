'use server'

import { testFetchAllEvents } from "@/app/lib/data";
import { Parser } from 'json2csv';

export default async function ExportEventsCSV({
    startDate,
    endDate
}:
    {
        startDate: Date | null,
        endDate: Date | null
    }) {

    const downloadCSV = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const events = await testFetchAllEvents();

        const fileName = `historico_${String(startDate)}_${String(endDate)}.csv`;

        // Generate CSV using json2csv
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(events);

        // Create a Blob from the CSV file
        const blob = new Blob([csv], { type: 'text/csv' });
        
        // Generate a download link and initiate the download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'download.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    return (
        <button className="btn btn-neutral" onClick={downloadCSV}>Descargar CSV</button>
    );

}