import { formatDateToLocal, formatCurrency, formatActiveDays, formatBoolean } from "@/app/lib/utils";
import { fetchParkingFees } from "@/app/lib/data";

export default async function ConfigurarTarifasTable(
    {
        query,
        currentPage,
    }: {
        query: string;
        currentPage: number;
    }
) {

    const fees = await fetchParkingFees(query, currentPage);

    return (
        <div className="overflow-auto h-[250px] z-0">
            <table className="table table-zebra table-pin-rows">
                <thead className='md:text-lg z-0'>
                    <tr>
                        <th>Nombre Tarifa</th>
                        <th>Tipo Vehículo</th>
                        <th>Valor Hora</th>
                        <th>Incremento 1er Hora</th>
                        <th>Incremento 2da Hora</th>
                        <th>Valor Día</th>
                        <th>Gracia 1er Hora</th>
                        <th>Gracia Hora Adicional</th>
                        <th>Vigencia Desde</th>
                        <th>Vigencia Hasta</th>
                        <th>Aplicable Los Días</th>
                        <th>Exclusivo Mens.</th>
                        <th>Exclusivo Admin.</th>
                        <th>Tarifa Activa</th>
                        <th>Cobro Nuevo Dia</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {fees?.map((fee) => (
                        <tr key={fee.id}>
                            <td>{fee.nombre_tarifa}</td>
                            <td>{fee.tipo_vehiculo}</td>
                            <td>{formatCurrency(fee.valor_hora)}</td>
                            <td>{formatCurrency(fee.incremento_primer_hora)}</td>
                            <td>{formatCurrency(fee.incremento_segunda_hora)}</td>
                            <td>{formatCurrency(fee.valor_dia)}</td>
                            <td>{fee.primera_hora_a_partir_minuto}</td>
                            <td>{fee.hora_adicional_a_partir_minuto}</td>
                            <td>{formatDateToLocal(fee.vigencia_desde)}</td>
                            <td>{formatDateToLocal(fee.vigencia_hasta)}</td>
                            <td>{formatActiveDays(fee.week_days_id)}</td>
                            <td>{formatBoolean(fee.exclusivo_mensualidad)}</td>
                            <td>{formatBoolean(fee.exclusivo_administracion)}</td>
                            <td>{formatBoolean(fee.tarifa_activa)}</td>
                            <td>{fee.nuevo_dia}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}