import Image from 'next/image';
import {testFetchAllEvents, fetchIncidents, fetchUsers} from '@/app/lib/data';

export default async function Page() {

    // const events = await testFetchAllEvents();

    const events = await testFetchAllEvents();

    return (
        <div className='flex justify-center'>
            <div className="flex flex-col items-center gap-16 max-h-screen overflow-auto place-content-center place-items-center">
                <div className='container bg-orange-500 rounded-lg max-w-3xl'>
                    <div className='flex flex-row items-center'>
                        <figure className=' p-2'>
                            <Image
                                src="/sheet.png"
                                className="rounded-xl"
                                alt={`Consultar Historial del Turno`}
                                width={56}
                                height={56}
                            />
                        </figure>
                        <div className="flex-grow text-center">
                            <p className="text-3xl font-medium text-white">Historial de Turno</p>
                        </div>
                    </div>
                </div>
                <div className="overflow-auto h-[500px]">
                    <table className="table table-zebra text-lg table-pin-rows">
                        {/* head */}
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
                            {/* {events.map(e => (
                                <tr key={e.id}>
                                    <td>{e.placa}</td>
                                    <td>{e.fecha_hora_ingreso}</td>
                                    <td>{e.fecha_hora_salida}</td>
                                    <td>{e.duracion}</td>
                                    <td>{e.tipo_vehiculo}</td>
                                    <td>{e.valor_base}</td>
                                    <td>{e.iva}</td>
                                    <td>{e.total}</td>
                                </tr>
                            ))} */}
                            {/* <tr>
                                <td>USD123</td>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}