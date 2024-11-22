import Link from 'next/link';

export default function Denied() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-red-500">Acceso Denegado</h1>
            <p className="text-lg text-gray-500 mt-4">No tienes permisos para acceder a esta página.</p>
            <Link href="/" className="flex items-center gap-5 mt-4 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
                <span>Regresar al Inicio</span>
            </Link>
        </main>
    );
}