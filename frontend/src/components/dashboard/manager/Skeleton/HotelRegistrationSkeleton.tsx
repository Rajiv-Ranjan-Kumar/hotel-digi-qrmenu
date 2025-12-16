import { motion } from "framer-motion";


export default function HotelRegistrationSkeleton() {
    return (
        <div
            className="flex w-full flex-col items-center justify-center 
            bg-(--primary-bg-color)"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col w-full max-w-sm sm:max-w-lg
                px-6 py-8 sm:px-8 sm:py-10 
                bg-(--secondary-bg-color) rounded-xl 
                border border-(--border-color) shadow-lg"
            >

                {/* ICON PLACEHOLDER */}
                <div className="flex justify-center mb-3">
                    <div className="h-12 w-12 bg-gray-400/20 rounded-full animate-pulse"></div>
                </div>

                {/* TITLE */}
                <div className="h-7 w-48 bg-gray-400/20 rounded-md mx-auto mb-2 animate-pulse"></div>

                {/* SUBTITLE */}
                <div className="h-4 w-64 bg-gray-400/20 rounded-md mx-auto mb-8 animate-pulse"></div>

                {/* INPUT FIELDS */}
                <div className="flex flex-col gap-5">

                    {/* Hotel Name */}
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-24 bg-gray-400/20 rounded animate-pulse"></div>
                        <div className="h-12 w-full bg-gray-400/20 rounded-md animate-pulse"></div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-28 bg-gray-400/20 rounded animate-pulse"></div>
                        <div className="h-24 w-full bg-gray-400/20 rounded-md animate-pulse"></div>
                    </div>

                    {/* Logo field */}
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-16 bg-gray-400/20 rounded animate-pulse"></div>
                        <div className="h-12 w-full bg-gray-400/20 rounded-md animate-pulse"></div>
                    </div>
                </div>

                {/* BUTTON */}
                <div className="h-12 w-full bg-gray-400/20 rounded-md mt-8 animate-pulse"></div>

            </motion.div>
        </div>
    );
}
