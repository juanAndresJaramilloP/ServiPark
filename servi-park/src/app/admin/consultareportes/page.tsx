import BarChartAxisLabels from '@/app/ui/admin/barchart';
import BarChartAxisLabels2 from '@/app/ui/admin/barchart2';
import DonutChartCallback from '@/app/ui/admin/donutchart';


export default function Page() {
    return (
        <div className='flex flex-col items-center gap-16'>
            <BarChartAxisLabels />
            <div className='flex flex-row items-center gap-10'>
                <DonutChartCallback />
                <BarChartAxisLabels2 />
            </div>
        </div>

    );
}