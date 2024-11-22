import ServiParkLogo from '@/app/ui/servipark-logo';
import Link from "next/link";

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function NavBar() {

    const session = await getServerSession(options);
    if (!session) {
        redirect('/api/auth/signin');
    }

    const homeLink = session.user.role === 'ADMINISTRADOR' || session.user.role === "GERENTE" ? '/admin' : '/employees';
    const userName = 'name' in session.user && typeof session.user.name === "string" ? session.user.name : 'Avatar';
    const userRole = session.user.role;

    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="navbar-start">
                <div className="w-20 md:w-28 h-auto ml-4">
                    <Link href={homeLink}><ServiParkLogo /></Link>
                </div>
            </div>
            <div className="navbar-center">
                {session.user.role === "GERENTE" && <Link href="/management/employees" className="btn btn-outline">Empleados</Link>}
            </div>
            <div className="navbar-end">
                <div className="flex flex-row-reverse items-center">
                    <div className="ml-2 mr-4">
                        <p className="text-sm md:text-lg font-medium text-gray-900">{userName}</p>
                        <p className="text-sm text-gray-500">{userRole}</p>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn md:btn-lg btn-ghost btn-circle avatar hover:bg-gray-200">
                            <div className="rounded-full">
                                {/* <Image
                                    src="/cool-avatar.jpg"
                                    className="rounded-full"
                                    alt={session.user && 'name' in session.user && typeof session.user.name === "string" ? session.user.name : 'Avatar'}
                                    width={48}
                                    height={48}
                                /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link className="justify-between" href="/profile">
                                    Perfil
                                </Link>
                            </li>
                            <li><Link href="/api/auth/signout">Cerrar Sesión</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}