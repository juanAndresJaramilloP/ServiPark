import { fetchFilteredEvents } from "@/app/lib/data";
import { formatCurrency, formatDateToLocale} from "@/app/lib/utils";

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function HistorialTable(
    {
        query,
        currentPage,
    }: {
        query: string;
        currentPage: number;
     }
) {

    const session = await getServerSession(options);
    if (!session) {
        redirect('/api/auth/signin');
    }

    const userID = session.user.id;
    const events = await fetchFilteredEvents(query, currentPage, userID);

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