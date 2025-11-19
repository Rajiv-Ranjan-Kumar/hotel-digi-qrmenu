import { motion } from "framer-motion";

export default function Footer() {
    return (
        <>
            {/* Top Footer */}
            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center border-t border-solid border-white/10 px-4 py-10 sm:px-8 bg-(--primary-bg-color)"
            >
                <div className="grid w-full max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">

                    {/* Logo + About */}
                    <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 text-(--accent-color)">
                                <svg fill="currentColor" viewBox="0 0 48 48">
                                    <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" />
                                </svg>
                            </div>

                            <h2 className="text-base font-bold text-(--primary-text-color)">
                                HotelDigiQRmenu
                            </h2>
                        </div>

                        <p className="text-sm text-(--secondary-text-color)">
                            The future of hotel dining.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-(--primary-text-color)">Product</h3>

                        <a className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) transition" href="#features">Features</a>
                        <a className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) transition" href="#pricing">Pricing</a>
                        <a className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) transition" href="#faq">FAQ</a>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-(--primary-text-color)">Company</h3>

                        <a className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) transition" href="#">About Us</a>
                        <a className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) transition" href="#">Blog</a>
                        <a className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) transition" href="#">Contact</a>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-(--primary-text-color)">Legal</h3>

                        <a className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) transition" href="#">Privacy Policy</a>
                        <a className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) transition" href="#">Terms of Service</a>
                    </div>

                </div>
            </motion.footer>

            {/* Bottom Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center border-t border-white/10 px-4 py-4 bg-(--primary-bg-color)"
            >
                <p className="text-sm text-center text-(--secondary-text-color)">
                    © 2024 HotelDigiQRmenu. All rights reserved.
                </p>
            </motion.div>
        </>
    );
}
