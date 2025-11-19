import { motion } from "framer-motion";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState, type ChangeEvent, type FormEvent } from "react";
import InputField from "../../utils/elements/InputField";
import { validateForm, type ValidationSchema } from "../../utils/validator";
import SubmitButton from "../../utils/elements/SubmitButton";
import { useNavigate } from "react-router-dom";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";





// Form State & Error State Types
interface FormState {
    email: string;
    password: string;
}

interface ErrorState {
    email?: string;
    password?: string;
}






export default function Login() {
    const [form, setForm] = useState<FormState>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<ErrorState>({});
    const navigate = useNavigate();



    // Handle Input Change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };





    // Validation Rules
    const validationRules: ValidationSchema = {
        email: {
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
        },
        password: {
            required: true,
            minLength: 6,
        },
    };






    // Handle Form Submit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(form, validationRules);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Form Submitted:", form);
            alert("Form submitted");
        }
    };







    return (
        <div
            className="relative flex min-h-screen w-full flex-col items-center justify-center 
            bg-(--primary-bg-color) transition-colors"
        >
            <motion.form
                onSubmit={handleSubmit}
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
                    {/* EMAIL */}
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

                    {/* PASSWORD */}
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        placeholder="********"
                        onChange={handleChange}
                        Icon={LockClosedIcon}
                        passwordToggle
                        error={errors.password}
                    />
                </motion.div>

                {/* REMEMBER / FORGOT */}
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

                    <button onClick={() => navigate(defaultRoutes.forgotPassword.path)} className="text-sm text-(--secondary-text-color) hover:text-(--accent-color) cursor-pointer">
                        Forgot password?
                    </button>
                </div>

                {/* BUTTON */}
                <SubmitButton text="Login" loading={false} />

                {/* SIGNUP LINK */}
                <div className="pt-8 text-center">
                    <p className="text-(--secondary-text-color)">
                        Don&apos;t have an account?{" "}
                        <button onClick={() => navigate(defaultRoutes.signup.path)} className="font-semibold text-(--primary-text-color) hover:text-(--accent-color) cursor-pointer">
                            Create an account
                        </button>
                    </p>
                </div>
            </motion.form>
        </div>
    );
}
