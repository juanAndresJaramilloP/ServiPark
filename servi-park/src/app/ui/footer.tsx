import ServiParkLogo from '@/app/ui/servipark-logo';
import Clock from "@/app/ui/clock";
import FooterStats from '@/app/ui/footerStats';

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
                <FooterStats />
            </nav>
        </footer>
    );
}