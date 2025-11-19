import { motion } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState, type ChangeEvent, type FormEvent } from "react";
import InputField from "../../utils/elements/InputField";
import SubmitButton from "../../utils/elements/SubmitButton";
import { validateForm, type ValidationSchema } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";




// Form State & Error State Types
interface FormState {
    email: string;
}

interface ErrorState {
    email?: string;
}







export default function ForgotPassword() {
    const [form, setForm] = useState<FormState>({ email: "" });
    const [errors, setErrors] = useState<ErrorState>({});
    const navigate = useNavigate();





    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };






    const validationRules: ValidationSchema = {
        email: {
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
        },
    };






    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(form, validationRules);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            alert(`OTP sent to ${form.email}`);
            navigate(defaultRoutes.otpVerification.path, { state: { email: form.email }, replace: true });
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
                        <span className="material-symbols-outlined text-(--accent-color)" style={{ fontSize: "50px" }}>
                            mail
                        </span>
                    </div>

                    <h1 className="text-(--primary-text-color) text-3xl font-bold text-center">Forgot Password</h1>
                    <p className="text-(--secondary-text-color) text-center"> Enter your email to receive the OTP.</p>
                </div>


                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="example@gmail.com"
                    onChange={handleChange}
                    Icon={EnvelopeIcon}
                    error={errors.email}
                />

                <SubmitButton text="Send OTP" loading={false} />

                <label className="text-(--primary-text-color) cursor-pointer text-sm text-center">
                    Remember my password?{" "}
                    <button onClick={() => navigate(defaultRoutes.login.path)} className="font-semibold text-(--primary-text-color) hover:text-(--accent-color)">
                        Login
                    </button>
                </label>
            </motion.form>
        </div>
    );
}
