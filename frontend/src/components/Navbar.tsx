import { Navbar, Button } from "flowbite-react";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { defaultRoutes } from "../utils/routes/defaultRoutes";
import { useNavigate } from "react-router-dom";




export default function AppNavbar() {

    const navigate = useNavigate();


    return (
        <Navbar
            fluid
            rounded
            className="sticky top-0 z-50 bg-(--primary-bg-color)/80 backdrop-blur-lg border-b border-white/10 px-6 py-3"
        >
            <a href="/" className="flex items-center">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-(--accent-color)/20 text-(--accent-color)">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20" />
                    </svg>
                </div>
                <span className="self-center whitespace-nowrap pl-3 text-xl font-bold text-(--primary-text-color)">
                    HotelDigiQRmenu
                </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-(--primary-text-color)">
                <a href="#features" className="hover:text-(--accent-color) transition-all">Features</a>
                <a href="#pricing" className="hover:text-(--accent-color) transition-all">Pricing</a>
                <a href="#faq" className="hover:text-(--accent-color) transition-all">FAQ</a>

                <Button onClick={() => navigate(defaultRoutes.login.path)} className="w-fit px-5 bg-(--accent-color) text-(--primary-text-color) font-semibold hover:bg-(--hover-accent-color)">
                    Login
                </Button>

                <ThemeSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
                aria-label="Toggle navigation"
                className="md:hidden text-(--primary-text-color) hover:text-(--accent-color) text-3xl"
            >
                <span className="material-symbols-outlined">menu</span>
            </button>
        </Navbar>
    );
}
