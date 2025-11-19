import { motion } from "framer-motion";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState, type ChangeEvent, type FormEvent } from "react";
import InputField from "../../utils/elements/InputField";
import { validateForm, type ValidationSchema } from "../../utils/validator";
import SubmitButton from "../../utils/elements/SubmitButton";
import { useNavigate } from "react-router-dom";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";




// Form State & Error State Types
interface FormState {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

interface ErrorState {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
}






export default function Signup() {
    const [form, setForm] = useState<FormState>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
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
        first_name: {
            required: true,
            requiredMessage: "First name is required",
        },

        last_name: {
            required: true,
            requiredMessage: "Last name is required",
        },

        email: {
            required: true,
            requiredMessage: "Email is required",
            pattern: /^\S+@\S+\.\S+$/,
            patternMessage: "Enter a valid email format like example@gmail.com"
        },

        password: {
            required: true,
            requiredMessage: "Password cannot be empty",

            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            patternMessage: "Use uppercase, lowercase, number & symbol (e.g. Abc@1234)",

            minLength: 8,
            minLengthMessage: "Password must be minimum 8 characters",
        },

        confirm_password: {
            required: true,
            requiredMessage: "Please confirm your password",
            custom: (value) => {
                if (value !== form.password) return "Passwords do not match";
                return null;
            },
        },
    };






    // Handle Form Submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(form, validationRules);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Signup Data:", form);
            alert("Signup Successful");
        }
    };









    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-(--primary-bg-color) transition-colors">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-10 w-full max-w-sm sm:max-w-lg px-6 py-8 sm:px-8 sm:py-10 bg-(--secondary-bg-color) rounded-xl border border-(--border-color) shadow-lg"
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

                <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3"
                >
                    {/* FIRST & LAST NAME ROW (Responsive) */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <InputField
                                label="First Name"
                                name="first_name"
                                type="text"
                                value={form.first_name}
                                placeholder="John"
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                        onChange={handleChange}
                        Icon={EnvelopeIcon}
                        error={errors.email}
                    />

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
                </motion.div>

                <SubmitButton text="Sign Up" loading={false} />

                <div className="text-center">
                    <p className="text-(--secondary-text-color)">
                        Already have an account?{" "}
                        <button onClick={() => navigate(defaultRoutes.login.path)} className="font-semibold text-(--primary-text-color) hover:text-(--accent-color) cursor-pointer">
                            Login
                        </button>
                    </p>
                </div>
            </motion.form>
        </div>
    );
}
