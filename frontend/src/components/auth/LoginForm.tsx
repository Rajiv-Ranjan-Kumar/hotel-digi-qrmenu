import { motion } from "framer-motion";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import InputField from "../../utils/elements/InputField";
import SubmitButton from "../../utils/elements/SubmitButton";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";
import { useNavigate } from "react-router-dom";



interface Props {
    form: {
        email: string;
        password: string;
    };
    errors: {
        email?: string;
        password?: string;
    };
    loading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}





export default function LoginForm({ form, errors, loading, onChange, onSubmit }: Props) {

    const navigate = useNavigate();

    

    return (
        <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col w-full max-w-sm sm:max-w-lg px-6 py-8 
            sm:px-8 sm:py-10 bg-(--secondary-bg-color) rounded-xl 
            border border-(--border-color) shadow-lg"
        >
            <div className="flex justify-center mb-3">
                <span
                    className="material-symbols-outlined text-(--accent-color)"
                    style={{ fontSize: "50px", fontVariationSettings: "'FILL' 1" }}
                >
                    shield_lock
                </span>
            </div>

            <h1 className="text-(--primary-text-color) text-3xl font-bold text-center pb-2">
                Welcome Back
            </h1>

            <p className="text-(--secondary-text-color) text-center pb-8">
                Enter your credentials to access your account.
            </p>

            <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3"
            >
                {/* Email */}
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="example@gmail.com"
                    onChange={onChange}
                    Icon={EnvelopeIcon}
                    error={errors.email}
                />

                {/* Password */}
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="********"
                    onChange={onChange}
                    Icon={LockClosedIcon}
                    passwordToggle
                    error={errors.password}
                />
            </motion.div>

            {/* REMEMBER & FORGOT */}
            <div className="flex items-center justify-between py-4">
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="
                            mr-2 cursor-pointer
                            appearance-none
                            w-4 h-4
                            rounded-sm
                            border border-(--secondary-text-color)
                            bg-(--secondary-bg-color)
                            checked:bg-(--accent-color)
                            checked:border-(--accent-color)
                            checked:before:content-['✔']
                            before:text-(--primary-text-color)
                            before:flex before:items-center before:justify-center
                            before:w-full before:h-full
                            before:text-[0.75rem]
                        "
                    />
                    <span className="text-sm text-(--secondary-text-color)">
                        Remember Me
                    </span>
                </label>

                <button
                    onClick={() => navigate(defaultRoutes.forgotPassword.path)}
                    type="button"
                    className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) cursor-pointer"
                >
                    Forgot password?
                </button>
            </div>

            {/* SUBMIT BUTTON */}
            <SubmitButton text="Login" loading={loading} />

            {/* SIGNUP link */}
            <div className="pt-8 text-center">
                <p className="text-(--secondary-text-color)">
                    Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate(defaultRoutes.signup.path)}
                        className="font-semibold text-(--primary-text-color) hover:text-(--accent-color) cursor-pointer"
                    >
                        Create an account
                    </button>
                </p>
            </div>
        </motion.form>
    );
}
