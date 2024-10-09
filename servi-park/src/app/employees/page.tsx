import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col xl:flex-row gap-4 justify-center items-center">
      <div className="card bg-base-100 w-72 shadow-2xl max-w-[350px]">
        <figure className="px-10 pt-10">
          <Image
            src="/toll.png"
            className="rounded-xl"
            alt={`Carro ingresando al parqueadero`}
            width={208}
            height={208}
          />
        </figure>
        <div className="card-body items-center text-center">
          <div className="card-actions">
            <Link href="/employees/registrarvehiculo" className="btn bg-violet-950 hover:bg-violet-800 rounded-xl text-white">Ingresar Vehículo</Link>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-72 shadow-2xl max-w-[350px]">
        <figure className="px-10 pt-10">
          <Image
            src="/exit.png"
            className="rounded-xl"
            alt={`Carro saliendo del parqueadero`}
            width={208}
            height={208}
          />
        </figure>
        <div className="card-body items-center text-center">
          <div className="card-actions">
            <Link href="/employees/retirarvehiculo" className="btn bg-blue-600 hover:bg-blue-500 rounded-xl text-white">Retirar Vehículo</Link>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-72 shadow-2xl max-w-[350px]">
        <figure className="px-10 pt-10">
          <Image
            src="/sheet.png"
            className="rounded-xl"
            alt={`Consultar Historial del Turno`}
            width={208}
            height={208}
          />
        </figure>
        <div className="card-body items-center text-center">
          <div className="card-actions">
            <Link href="/employees/historial" className="btn bg-orange-500 hover:bg-orange-400 rounded-xl text-white"> Consultar Historial Turno</Link>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-72 shadow-2xl max-w-[350px]">
        <figure className="px-10 pt-10">
          <Image
            src="/alert.png"
            className="rounded-xl"
            alt={`Reportar Incidente`}
            width={208}
            height={208}
          />
        </figure>
        <div className="card-body items-center text-center">
          <div className="card-actions">
            <Link href="/employees/incidente" className="btn bg-yellow-600 hover:bg-yellow-500 rounded-xl text-white">Reportar Incidente</Link>
          </div>
        </div>
      </div>
    </div>
  );
}