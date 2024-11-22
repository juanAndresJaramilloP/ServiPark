import { fetchEmployeePages } from "@/app/lib/data";
import { Suspense } from 'react';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import EmployeesTable from '@/app/ui/management/employeestable';
import { EmployeesTableSkeleton } from "@/app/ui/skeletons";
import { fetchFilteredEmployees } from '@/app/lib/data';
import AddEmployeesModal from '@/app/ui/management/add-employees-modal';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page(
    { searchParams }: { searchParams?: { query?: string; page?: string; } }
) {

    const session = await getServerSession(options);
    if (!session) {
        redirect('/api/auth/signin');
    }

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchEmployeePages(query);

    const employees = await fetchFilteredEmployees(query, currentPage);

    return (
        <div className='flex justify-center'>
            <div className="flex flex-col items-center max-h-screen overflow-auto place-content-center place-items-center">
                <div className='container bg-slate-500 rounded-lg max-w-3xl mb-8'>
                    <div className='flex flex-row items-center'>
                        <figure className='p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-11">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                        </figure>
                        <div className="flex-grow text-center">
                            <p className="text-3xl font-medium text-white">Empleados</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full justify-between">
                    <div className="w-1/2">
                        <Search placeholder='Busque por nombre de empleado...' />
                    </div>
                    <AddEmployeesModal />
                </div>
                <Suspense key={query + currentPage} fallback={<EmployeesTableSkeleton />}>
                    <EmployeesTable employees={employees} />
                </Suspense>
                <div className="flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}