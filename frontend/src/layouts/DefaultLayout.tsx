import { Outlet, Link } from "react-router-dom";
import { Navbar, Footer } from "flowbite-react";
import { ThemeSwitcher } from "../components/ThemeSwitcher/ThemeSwitcher";

export const DefaultLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-(--primary-bg-color) text-(--primary-text-color)">

            {/* Navbar */}
            <Navbar fluid={true} rounded={true} className="bg-(--secondary-bg-color) text-(--primary-text-color)">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    {/* Brand */}
                    <Link to="/" className="flex items-center text-xl font-bold text-(--primary-text-color)">
                        Hotel Digi QR
                    </Link>

                    {/* Right side */}
                    <div className="flex md:order-2 items-center space-x-2">
                        <ThemeSwitcher />
                        <Link to="/login" className="px-5 py-1 pb-1.5 font-semibold bg-(--accent-color) text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300 backdrop-blur-sm cursor-pointer rounded-2xl"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <Link to="/" className="block py-2 pr-4 pl-3 hover:text-(--accent-color)">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="block py-2 pr-4 pl-3 hover:text-(--accent-color)">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="block py-2 pr-4 pl-3 hover:text-(--accent-color)">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Navbar>

            {/* Main Content */}
            <main className="flex-1 container mx-auto p-6 overflow-auto">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer className="bg-(--secondary-bg-color) text-(--primary-text-color) mt-auto">
                <div className="w-full container mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
                    <span className="text-sm text-(--primary-text-color)">
                        &copy; {new Date().getFullYear()} Hotel Digi QR. All rights reserved.
                    </span>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <Link to="#" className="hover:text-(--accent-color)">Privacy</Link>
                        <Link to="#" className="hover:text-(--accent-color)">Terms</Link>
                    </div>
                </div>
            </Footer>
        </div>
    );
};
