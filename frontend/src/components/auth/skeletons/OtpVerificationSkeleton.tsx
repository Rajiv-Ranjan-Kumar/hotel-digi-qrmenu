import { motion } from "framer-motion";


export default function OtpVerificationSkeleton() {
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

                {/* OTP BOXES */}
                <div className="mx-auto flex justify-center gap-3 sm:gap-5 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-12 w-12 sm:h-14 sm:w-14 bg-gray-400/20 rounded-md animate-pulse"
                        ></div>
                    ))}
                </div>

                {/* BUTTON */}
                <div className="h-12 w-full bg-gray-400/20 rounded-md animate-pulse"></div>

                {/* RESEND TEXT */}
                <div className="pt-8 flex justify-center">
                    <div className="h-4 w-48 bg-gray-400/20 rounded animate-pulse"></div>
                </div>

            </motion.div>
        </div>
    );
}