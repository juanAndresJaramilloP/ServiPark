import Image from 'next/image';
import HistorialTable from '@/app/ui/historial/historialtable';
import { Suspense } from 'react';
import { HistorialTableSkeleton } from '@/app/ui/skeletons';
import Pagination from '@/app/ui/historial/pagination';
import { fetchEventsPages } from '@/app/lib/data';
import Search from '@/app/ui/historial/search';

export default async function Page(
    { searchParams }: { searchParams?: { query?: string; page?: string; } }
) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchEventsPages(query);

    return (
        <div className='flex justify-center'>
            <div className="flex flex-col items-center max-h-screen overflow-auto place-content-center place-items-center">
                <div className='container bg-orange-500 rounded-lg max-w-3xl mb-8'>
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
                <Search placeholder='Busque por placa...' />
                <Suspense key={query + currentPage} fallback={<HistorialTableSkeleton />}>
                    <HistorialTable query={query} currentPage={currentPage} />
                </Suspense>
                <div className="flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}