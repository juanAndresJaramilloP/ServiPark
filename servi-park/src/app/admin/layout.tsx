import NavBar from "@/app/ui/navbar";
import Footer from "@/app/ui/footer";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow p-6">
                <div className="container min-w-full">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}