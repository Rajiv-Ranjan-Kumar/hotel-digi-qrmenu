import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { defaultRoutes } from '../../utils/routes/defaultRoutes';






const AccountSuccessContent = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate(defaultRoutes.login.path);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 w-full max-w-sm sm:max-w-lg px-6 py-8 bg-(--secondary-bg-color) rounded-xl border border-(--border-color) shadow-lg text-center"
        >
            {/* ICON */}
            <div className="flex justify-center">
                <span
                    className="material-symbols-outlined text-(--accent-color)"
                    style={{ fontSize: "60px", fontVariationSettings: "'FILL' 1" }}
                >
                    check_circle
                </span>
            </div>

            {/* TITLE */}
            <h1 className="text-(--primary-text-color) text-3xl font-bold">
                Account Created Successfully!
            </h1>

            {/* DESCRIPTION */}
            <p className="text-(--secondary-text-color) text-lg">
                Congratulations! Your account has been successfully created. <br />
                You can now login to your account.
            </p>

            {/* LOGIN BUTTON */}
            <button
                onClick={handleLogin}
                className="mt-4 rounded-lg bg-(--accent-color) text-white w-full py-3 font-semibold hover:bg-(--accent-color)/90 transition-colors"
            >
                Go to Login
            </button>
        </motion.div>
    )
}

export default AccountSuccessContent;