import { motion } from "framer-motion";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import InputField from "../../utils/elements/InputField";
import SubmitButton from "../../utils/elements/SubmitButton";
import { useNavigate } from "react-router-dom";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";
import type { ChangeEvent, FormEvent } from "react";





interface SignupFormProps {
    form: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        confirm_password: string;
        role_id: number;
    };

    errors: {
        first_name?: string;
        last_name?: string;
        email?: string;
        password?: string;
        confirm_password?: string;
    };

    loading: boolean;

    onChange: (e: ChangeEvent<HTMLInputElement>) => void;

    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}





export default function SignupForm({ form, errors, loading, onChange, onSubmit }: SignupFormProps) {

    const navigate = useNavigate();

    return (
        <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10 w-full max-w-sm sm:max-w-lg 
            px-6 py-8 sm:px-8 sm:py-10 
            bg-(--secondary-bg-color) rounded-xl 
            border border-(--border-color) shadow-lg"
        >
            <div className="flex flex-col gap-2">
                <div className="flex justify-center mb-3">
                    <span
                        className="material-symbols-outlined text-(--accent-color)"
                        style={{ fontSize: "50px", fontVariationSettings: "'FILL' 1" }}
                    >
                        person_add
                    </span>
                </div>

                <h1 className="text-(--primary-text-color) text-3xl font-bold text-center">
                    Create Account
                </h1>

                <p className="text-(--secondary-text-color) text-center">
                    Fill the details to register your account
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <InputField
                            label="First Name"
                            name="first_name"
                            type="text"
                            value={form.first_name}
                            placeholder="John"
                            onChange={onChange}
                            Icon={UserIcon}
                            error={errors.first_name}
                        />
                    </div>

                    <div className="flex-1">
                        <InputField
                            label="Last Name"
                            name="last_name"
                            type="text"
                            value={form.last_name}
                            placeholder="Doe"
                            onChange={onChange}
                            Icon={UserIcon}
                            error={errors.last_name}
                        />
                    </div>
                </div>

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

                <InputField
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    value={form.confirm_password}
                    placeholder="********"
                    onChange={onChange}
                    Icon={LockClosedIcon}
                    passwordToggle
                    error={errors.confirm_password}
                />
            </div>

            <SubmitButton text="Sign Up" loading={loading} />

            <div className="text-center">
                <p className="text-(--secondary-text-color)">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate(defaultRoutes.login.path)}
                        className="font-semibold text-(--primary-text-color) hover:text-(--accent-color)"
                    >
                        Login
                    </button>
                </p>
            </div>
        </motion.form>
    );
}
