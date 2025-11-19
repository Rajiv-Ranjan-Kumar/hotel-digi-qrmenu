import { motion } from "framer-motion";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useState, type ChangeEvent, type FormEvent } from "react";
import InputField from "../../utils/elements/InputField";
import SubmitButton from "../../utils/elements/SubmitButton";
import { validateForm, type ValidationSchema } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";



// Form State & Error State Types
interface FormState {
    password: string;
    confirm_password: string;
}

interface ErrorState {
    password?: string;
    confirm_password?: string;
}







export default function ResetPassword() {
    const [form, setForm] = useState<FormState>({
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState<ErrorState>({});
    const navigate = useNavigate();




    // Handle Input Change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };





    // Validation Rules
    const validationRules: ValidationSchema = {
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            patternMessage: "Use A-Z, a-z, 0-9 & symbol (e.g. Abc@1234)",
        },
        confirm_password: {
            required: true,
            custom: (value: string) =>
                value !== form.password ? "Passwords do not match" : null,
        },
    };






    // Handle Form Submit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(form, validationRules);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            alert("Password Reset Successful!");
            navigate(defaultRoutes.login.path);
        }
    };









    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-(--primary-bg-color)">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-10 w-full max-w-sm sm:max-w-lg px-6 py-8 bg-(--secondary-bg-color) rounded-xl border border-(--border-color) shadow-lg"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-center">
                        <span
                            className="material-symbols-outlined text-(--accent-color)"
                            style={{ fontSize: "50px", fontVariationSettings: "'FILL' 1" }}
                        >
                            lock_reset
                        </span>
                    </div>

                    <h1 className="text-(--primary-text-color) text-3xl font-bold text-center">
                        Set New Password
                    </h1>

                    <p className="text-(--secondary-text-color) text-center">
                        Create a strong password for your account.
                    </p>
                </div>

                {/* NEW PASSWORD */}
                <InputField
                    label="New Password"
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="********"
                    onChange={handleChange}
                    Icon={LockClosedIcon}
                    passwordToggle
                    error={errors.password}
                />

                {/* CONFIRM PASSWORD */}
                <InputField
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    value={form.confirm_password}
                    placeholder="********"
                    onChange={handleChange}
                    Icon={LockClosedIcon}
                    passwordToggle
                    error={errors.confirm_password}
                />

                <SubmitButton text="Reset Password" loading={false} />

                <div className="text-center">
                    <p className="text-(--secondary-text-color)">
                        Back to{" "}
                        <button
                            onClick={() => navigate(defaultRoutes.login.path)}
                            className="font-semibold text-(--primary-text-color) hover:text-(--accent-color)"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </motion.form>
        </div>
    );
}
