import { registerVehicle } from '@/app/lib/actions';
import { ParkingFeeField } from '@/app/lib/definitions';

export default function RegisterVehicleForm({parkingFees}:{parkingFees: ParkingFeeField[]}) {

    return (
        <form action={registerVehicle} className="space-y-3 h-[250px]">
            <div className='flex flex-row justify-between items-center'>
                <label className="text-xl font-medium text-gray-950" htmlFor="Placa">Placa</label>
                <input className="peer block w-40 rounded-md border border-gray-300 py-[9px] text-base text-center outline-2 placeholder:text-gray-500" type="text" id="Placa" name="Placa" placeholder='AAA123' />
            </div>
            <div className='flex flex-row justify-between items-center'>
                <label className="text-xl font-medium text-gray-950" htmlFor='TipoVehiculo'>Tipo Vehículo</label>
                <select
                    id="TipoVehiculo"
                    name="TipoVehiculo"
                    className="peer block w-40 cursor-pointer border rounded-md py-2 px-2 text-lg text-wrap border-gray-300 outline-2 placeholder:text-gray-500">
                    <option value="" disabled>Tipo Vehiculo</option>
                    <option>Automóvil</option>
                    <option>Camioneta</option>
                    <option>Motocicleta</option>
                    <option>Bicicleta</option>
                </select>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <label className="text-xl font-medium text-gray-950" htmlFor='Tarifa'>Tarifa</label>
                <select
                    id="Tarifa"
                    name="Tarifa"
                    className="peer block max-w-[400px] cursor-pointer border rounded-md py-2 px-2 text-lg text-wrap border-gray-300 outline-2 placeholder:text-gray-500">
                    <option value="" disabled>Seleccione la tarifa</option>
                    {parkingFees.map((fee) => (
                        <option key={fee.id} value={fee.id}>{fee.nombre_tarifa}</option>
                    ))}
                </select>
            </div>
            <div className="card-actions justify-end absolute bottom-8 right-8">
                <button className="btn btn-primary text-lg">Ingresar Vehículo</button>
            </div>
        </form>
    );

}