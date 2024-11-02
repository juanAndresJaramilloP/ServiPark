import {DownloadDataButton, FinancialReportsButton, ParkingFeesButton} from '@/app/ui/admin/buttons';
import StatsCard from '@/app/ui/admin/statscard';

export default function Page() {

    return (
        <div className="flex flex-col xl:flex-row gap-14 xl:gap-44 justify-center items-center">
            <div className='flex flex-col gap-8'>
                <DownloadDataButton />
                <FinancialReportsButton />
                <ParkingFeesButton />
            </div>
            <StatsCard />
        </div>
    );
}