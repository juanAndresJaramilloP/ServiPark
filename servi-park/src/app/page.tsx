import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ServiParkLogo from '@/app/ui/servipark-logo'

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(options);
  if (!session) {
      redirect('/api/auth/signin');
  }

  const homeLink = session.user.role === 'ADMINISTRADOR' || session.user.role === "GERENTE" ? '/admin' : '/employees';

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-44 md:w-96">
        <ServiParkLogo />
      </div>
      <Link
        href={homeLink}
        className="flex items-center gap-5 mt-4 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        <span>Ingresar al Sistema</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </main>
  );
}
