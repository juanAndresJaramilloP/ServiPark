import { testFetchFilteredEvents } from "@/app/lib/data";
import { formatCurrency, formatDateToLocale} from "@/app/lib/utils";

export default async function HistorialTable(
    {
        query,
        currentPage,
    }: {
        query: string;
        currentPage: number;
     }
) {
    const events = await testFetchFilteredEvents(query, currentPage);

    return (
        <div className="overflow-auto h-[450px] border border-gray-300 rounded-md mt-3">
            <table className="table table-zebra text-lg table-pin-rows">
                <thead className='text-lg'>
                    <tr>
                        <th>Placa</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Tiempo</th>
                        <th>Tipo Vehiculo</th>
                        <th>Valor Base</th>
                        <th>IVA</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(e => (
                    <tr key={e.id}>
                        <td>{e.placa}</td>
                        <td>{formatDateToLocale(e.fecha_hora_ingreso)}</td>
                        <td>{formatDateToLocale(e.fecha_hora_salida)}</td>
                        <td>{e.duracion}</td>
                        <td>{e.tipo_vehiculo}</td>
                        <td>{formatCurrency(e.valor_base)}</td>
                        <td>{formatCurrency(e.iva)}</td>
                        <td>{formatCurrency(e.total)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}