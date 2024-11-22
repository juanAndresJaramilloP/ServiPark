import Image from "next/image";
import ServiParkLogo from '@/app/ui/servipark-logo';
import Clock from "@/app/ui/clock";

export default function Footer() {
    return (
        <footer className="footer bg-base-100 items-center p-2 shadow-inner grid-flow-col">
            <aside className="grid-flow-col items-center">
                <div className="w-20 md:w-28 h-auto ml-4">
                    <ServiParkLogo />
                </div>
                <Clock initialTime={new Date().toLocaleString()}/>
            </aside>
            <nav className="grid-flow-col md:place-self-center md:justify-self-end items-center">
                <Image
                    src="/car.png"
                    className=" min-w-8"
                    alt={`car`}
                    width={52}
                    height={36}
                />
                <p className="text-sm md:text-xl font-medium text-gray-900 mr-8">38</p>
                <Image
                    src="/motorcycle.png"
                    className=" min-w-8"
                    alt={`motorcycle`}
                    width={36}
                    height={36}
                />
                <p className="text-sm md:text-xl font-medium text-gray-900 mr-4 md:mr-16">15</p>
            </nav>
        </footer>
    );
}