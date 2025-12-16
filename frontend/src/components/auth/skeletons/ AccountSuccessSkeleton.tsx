import { motion } from "framer-motion";




export default function AccountSuccessSkeleton() {
    return (
        <div className="flex w-full flex-col items-center justify-center bg-(--primary-bg-color)">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-8 w-full max-w-sm sm:max-w-lg px-6 py-8 bg-(--secondary-bg-color) rounded-xl border border-(--border-color) shadow-lg text-center"
            >
                {/* ICON PLACEHOLDER */}
                <div className="flex justify-center mb-3">
                    <div className="h-14 w-14 bg-gray-400/20 rounded-full animate-pulse"></div>
                </div>

                {/* TITLE PLACEHOLDER */}
                <div className="h-7 w-64 bg-gray-400/20 rounded-md mx-auto animate-pulse"></div>

                {/* DESCRIPTION PLACEHOLDER */}
                <div className="h-4 w-80 bg-gray-400/20 rounded-md mx-auto animate-pulse"></div>
                <div className="h-4 w-72 bg-gray-400/20 rounded-md mx-auto animate-pulse"></div>

                {/* BUTTON PLACEHOLDER */}
                <div className="h-12 w-full bg-gray-400/20 rounded-md animate-pulse mt-4"></div>
            </motion.div>
        </div>
    );
}
