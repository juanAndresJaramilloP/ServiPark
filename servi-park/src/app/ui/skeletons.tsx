
export function FeeTableRowSkeleton() {

    return (
        <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            {/* Nombre Tarifa */}
            <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
                <div className="skeleton h-6 w-24 rounded bg-gray-100"></div>
            </td>
            {/* Tipo Vehículo */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-32 rounded bg-gray-100"></div>
            </td>
            {/* Valor Hora */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Incremento 1er Hora */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Incremento 2da Hora */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Valor Día */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Gracia 1er Hora */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Gracia Hora Adicional */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Vigencia Desde */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Vigencia Hasta */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Aplicable Los Días */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Exclusivo Mens. */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Exclusivo Admin. */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Tarifa Activa */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Cobro Nuevo Dia */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="skeleton h-6 w-16 rounded bg-gray-100"></div>
            </td>
        </tr>
    );
}

export function FeeTableSkeleton() {

    return (
        <div className="overflow-auto h-[250px] z-0">
            <table className="table table-zebra md:text-md table-pin-rows">
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
                <tbody>
                    <FeeTableRowSkeleton />
                    <FeeTableRowSkeleton />
                    <FeeTableRowSkeleton />
                </tbody>
            </table>
        </div>
    );
}

