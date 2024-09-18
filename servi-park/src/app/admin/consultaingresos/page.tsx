import Image from 'next/image';
import CalendarDatePicker from '@/app/ui/calendardatepicker';
//"flex flex-col items-center gap-8 max-h-screen overflow-auto"
export default function Page() {

    return (
        <div className='flex justify-center'>
            <div className="flex flex-col place-content-center max-h-screen overflow-auto max-w-[1000px] place-items-center">
                <div className='container bg-yellow-600 rounded-lg max-w-3xl mb-7'>
                    <div className='flex flex-row items-center'>
                        <figure className=' p-2'>
                            <Image
                                src="/history.png"
                                className="rounded-xl"
                                alt={`Consultar Historial del Turno`}
                                width={56}
                                height={56}
                            />
                        </figure>
                        <div className="flex-grow text-center">
                            <p className="text-3xl font-medium text-white">Consultar Ingresos por Rango de Fechas</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row -ml-[340px] gap-7'>
                    <div className='flex flex-row items-center'>
                        <label className="text-base md:text-lg font-medium text-gray-950 mr-4">Desde</label>
                        <CalendarDatePicker />
                    </div>
                    <div className='flex flex-row items-center'>
                        <label className="text-base md:text-lg font-medium text-gray-950 mr-4">Hasta</label>
                        <CalendarDatePicker />
                    </div>
                </div>
                <div className="overflow-auto h-[500px]">
                    <table className="table table-zebra text-lg table-pin-rows">
                        <thead className='text-lg'>
                            <tr>
                                <th>Placa</th>
                                <th>Entrada</th>
                                <th>Salida</th>
                                <th>Tiempo</th>
                                <th>Forma Pago</th>
                                <th>Valor Base</th>
                                <th>IVA</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                            <tr>
                                <th>USD123</th>
                                <td>14-08-2024</td>
                                <td>14-08-2024</td>
                                <td>2H + 5 min</td>
                                <td>Contado</td>
                                <td>$7,290</td>
                                <td>$1,710</td>
                                <td>$9,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}