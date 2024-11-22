import DownloadDataModal from '@/app/ui/download-data-modal';
import Image from 'next/image';
import Link from 'next/link';

export function DownloadDataButton() {
    return (
        <div className="card lg:card-side bg-base-200 shadow-2xl max-w-[450px]">
            <figure className="pl-4 py-4">
                <Image
                    src="/history.png"
                    className="rounded-xl"
                    alt="Icono de historial"
                    width={100}
                    height={100}
                />
            </figure>
            <div className="card-body items-center justify-center">
                <div className="card-actions">
                    <DownloadDataModal />
                </div>
            </div>
        </div>
    );
}

export function FinancialReportsButton() {

    return (
        <div className="card lg:card-side bg-base-200 shadow-2xl max-w-[450px]">
            <figure className="pl-4 py-4">
                <Image
                    src="/money.png"
                    className="rounded-xl"
                    alt="Icono de dinero"
                    width={100}
                    height={100}
                />
            </figure>
            <div className="card-body items-center justify-center">
                <div className="card-actions">
                    <Link href="/admin/consultareportes" className="btn btn-lg bg-green-700 hover:bg-green-800 rounded-xl text-white text-base max-w-52 h-fit">Consultar Reportes Financieros</Link>
                </div>
            </div>
        </div>
    );
}

export function ParkingFeesButton() {

    return (
        <div className="card lg:card-side bg-base-200 shadow-2xl max-w-[450px]">
            <figure className="pl-4 py-4">
                <Image
                    src="/updateToll.png"
                    className="rounded-xl"
                    alt="Icono de actualizar tarifas"
                    width={100}
                    height={100}
                />
            </figure>
            <div className="card-body items-center justify-center">
                <div className="card-actions">
                    <Link href="/admin/configurartarifas" className="btn btn-lg bg-blue-800 hover:bg-blue-950 rounded-xl text-white text-base max-w-52 h-fit">Configurar Tarifas y Horarios</Link>
                </div>
            </div>
        </div>
    );
}