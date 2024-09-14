import logo from '../../../public/logo-servipark.jpg';
import Image from "next/image";

export default function ServiParkLogo() {
    return (
            <Image
                src={logo}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                className="md:block"
                alt="Servipark Logo"
            />
    );
}