'use client';

import { DownloadDataButton, FinancialReportsButton, ParkingFeesButton } from '@/app/ui/admin/buttons';
import StatsCard from '@/app/ui/admin/statscard';
import { useState } from 'react';
import { Suspense } from 'react';
import { StatsCardSkeleton } from '@/app/ui/skeletons';
import { ErrorAlert } from '@/app/ui/feedback';

export default function Page() {

    const [error, setError] = useState<string>('');

    return (
        <div className='flex flex-col items-center'>
            <div className='max-w-2xl'>
                {error != '' && <ErrorAlert message={error} />}
            </div>
            <div className="flex flex-col xl:flex-row gap-14 xl:gap-44 justify-center items-center">
                <div className='flex flex-col gap-8'>
                    <DownloadDataButton />
                    <FinancialReportsButton />
                    <ParkingFeesButton />
                </div>
                <Suspense fallback={<StatsCardSkeleton />}>
                    <StatsCard setError={setError} />
                </Suspense>
            </div>
        </div>
    );
}