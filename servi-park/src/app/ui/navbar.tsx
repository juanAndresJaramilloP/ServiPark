import Image from "next/image";
import ServiParkLogo from '@/app/ui/servipark-logo';
import Link from "next/link";

export default function NavBar() {
    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
                <div className="w-20 md:w-28 h-auto ml-4">
                    <ServiParkLogo />
                </div>
            </div>
            <div className="flex-none flex-row-reverse">
                <div className="ml-2 mr-4">
                    <p className="text-sm md:text-lg font-medium text-gray-900">Yuri Jimenez</p>
                    <p className="text-sm text-gray-500">Empleada</p>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn md:btn-lg btn-ghost btn-circle avatar">
                        <div className="w-28 rounded-full">
                            <Image
                                src="/amy-burns.png"
                                className="rounded-full"
                                alt={`amy-burns's profile picture`}
                                width={48}
                                height={48}
                            />
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
                        <li><a>Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}