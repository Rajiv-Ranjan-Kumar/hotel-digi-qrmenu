import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export const DefaultLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-(--primary-bg-color) text-(--primary-text-color)">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 container mx-auto p-6 overflow-auto">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};
