import NavBar from "@/app/ui/navbar";
import Footer from "@/app/ui/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow p-4 md:overflow-y-auto md:p-6 place-content-center">{children}</div>
            <Footer />
        </div>
    );
}