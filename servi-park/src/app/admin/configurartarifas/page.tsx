import ConfigurarTarifasTable from '@/app/ui/configurartarifas/table';
import ConfigurarTarifasForm from '@/app/ui/configurartarifas/form';
import { FeeTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { fetchParkingFeePages } from '@/app/lib/data';

import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function Page(
    { searchParams }: { searchParams?: { query?: string; page?: string; } }
) {

    const session = await getServerSession(options);

    if(!session){
        redirect('/api/auth/signin');
    }

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchParkingFeePages(query);

    return (
        <div className="container mx-auto min-w-[1288px]">
            <ConfigurarTarifasForm />
            <div className="divider">Histórico</div>
            <div className='flex flex-row justify-between mb-2 z-0'>
                <div className='container w-[400px]'>
                    <Search placeholder='Busque por nombre de tarifa...' />
                </div>
                <Pagination totalPages={totalPages} />
            </div>
            <Suspense fallback={<FeeTableSkeleton />} >
                <ConfigurarTarifasTable query={query} currentPage={currentPage} />
            </Suspense>
        </div>
    );
}