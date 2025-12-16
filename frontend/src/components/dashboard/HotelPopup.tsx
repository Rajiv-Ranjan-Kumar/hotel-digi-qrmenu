import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { QrCodeIcon } from "@heroicons/react/24/outline"; 
import { managerRoutes } from "../../utils/routes/managerRoutes";


type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
};



export default function HotelRegisterPopup({ isOpen, onClose }: PopupProps) {
    const navigate = useNavigate();



    // Disable background scrolling when popup is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);




    const handleRegister = () => {
        onClose();
        navigate(managerRoutes.registerRestro.path, { replace: true });
    };





    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-hidden="true"
                    />

                    {/* Popup Card */}
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-(--primary-bg-color) dark:bg-(--secondary-bg-color) shadow-2xl z-50 rounded-xl p-6 flex flex-col items-center gap-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        role="dialog"
                        aria-labelledby="popup-title"
                        aria-describedby="popup-description"
                    >
                        {/* Icon */}
                        <QrCodeIcon className="w-16 h-16 text-(--accent-color) mb-4" aria-hidden="true" />

                        {/* Title */}
                        <h2
                            id="popup-title"
                            className="text-2xl font-bold text-(--primary-text-color) text-center mb-0!"
                        >
                            Register Your Restaurant
                        </h2>

                        <p className="text-center text-(--secondary-text-color)">
                            Start Offering QR Ordering
                        </p>

                        {/* Description */}
                        <p
                            id="popup-description"
                            className="text-(--secondary-text-color) text-center text-md mt-2"
                        >
                            Enable seamless ordering with QR code scanning. Let your guests order directly from their tables and enjoy a hassle-free experience.
                        </p>

                        {/* Register Button */}
                        <button
                            onClick={handleRegister}
                            className="mt-6 py-2 px-6 rounded-lg bg-(--accent-color) text-(--primary-text-color) font-semibold hover:bg-(--hover-accent-color) focus:outline-none focus:ring-2 focus:ring-(--accent-color) transition cursor-pointer"
                            aria-label="Register Now"
                        >
                            Register Now
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
