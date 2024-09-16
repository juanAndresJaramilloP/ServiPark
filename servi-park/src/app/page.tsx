import Image from "next/image";
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ServiParkLogo from '@/app/ui/servipark-logo'


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-44 md:w-96">
        <ServiParkLogo />
      </div>
      <Link
        href="/login"
        className="flex items-center gap-5 mt-4 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        <span>Iniciar Sesión</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </main>
  );
}
