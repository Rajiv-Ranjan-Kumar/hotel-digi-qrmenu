import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";



export default function PasswordResetSuccess() {
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-(--primary-bg-color)">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-6 w-full max-w-sm sm:max-w-md px-6 py-10 bg-(--secondary-bg-color) rounded-xl border border-(--border-color) shadow-lg"
            >
                {/* SUCCESS ICON */}
                <span
                    className="material-symbols-outlined text-(--accent-color)"
                    style={{ fontSize: "60px", fontVariationSettings: "'FILL' 1" }}
                >
                    check_circle
                </span>

                {/* HEADING */}
                <h1 className="text-(--primary-text-color) text-3xl font-bold text-center">
                    Password Reset Successful
                </h1>

                {/* SUBTEXT */}
                <p className="text-(--secondary-text-color) text-center max-w-xs">
                    Your password has been successfully updated.
                    You can now log in with your new password.
                </p>

                {/* BUTTON */}
                <button
                    onClick={() => navigate(defaultRoutes.login.path)}
                    className="
                        w-fit px-10 py-3.5 rounded-xl curosor-pointer
                        bg-(--accent-color) text-(--primary-text-color) 
                        text-base font-semibold
                        transition-all duration-300 
                        shadow-md shadow-black/20
                        hover:brightness-110 hover:shadow-lg 
                        active:scale-95
                    "
                >
                    Back to Login
                </button>

            </motion.div>
        </div>
    );
}
