import ConfigurarTarifasTable from '@/app/ui/configurartarifas/table';
import ConfigurarTarifasForm from '@/app/ui/configurartarifas/form';
import { FeeTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default function Page() {

    return (
        <div className="container mx-auto min-w-[1288px]">
            <ConfigurarTarifasForm />
            <div className="divider">Histórico</div>
            <Suspense fallback={<FeeTableSkeleton />} >
                <ConfigurarTarifasTable />
            </Suspense>
        </div>
    );
}