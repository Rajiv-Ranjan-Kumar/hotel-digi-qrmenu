
import { lazy, Suspense, useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { validateForm, type ValidationSchema } from "../../utils/validator";


import { register_user } from "../../services/apis/auth";
import { useNavigate } from "react-router-dom";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import SignupSkeleton from "../../components/auth/skeletons/SignupSkeleton";
import { useAlert } from "../../contexts/AlertProvider/useAlert";

const SignupForm = lazy(() => import("../../components/auth/SignupForm"));





interface FormState {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    role_id: number;
}

interface ErrorState {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
}




export default function Signup() {
    const { roles } = useSelector((state: RootState) => state.roles);
    const navigate = useNavigate();

    const [form, setForm] = useState<FormState>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        role_id: 0,
    });

    const [errors, setErrors] = useState<ErrorState>({});
    const [submitting, setSubmitting] = useState(false);

    const { showAlert } = useAlert();





    const managerRole = roles?.find((role) => role.name.toLowerCase().replace(/[\s_-]/g, "") === "manager");
    useEffect(() => managerRole && setForm(f => ({ ...f, role_id: managerRole.id })), [managerRole]);








    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };







    const validationRules: ValidationSchema = {
        first_name: { required: true },
        last_name: { required: true },
        email: {
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        },
        confirm_password: {
            required: true,
            custom: (value) => {
                if (value !== form.password) return "Passwords do not match";
                return null;
            },
        },
    };








    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(form, validationRules);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setSubmitting(true);
        const response = await register_user({ data: form });
        setSubmitting(false);

        if (!response.status) {
            showAlert("danger", response.message || "Signup failed. Please try again.");
            return;
        }

        navigate(defaultRoutes.otpVerification.path, {
            state: {
                email: form.email,
                from: "signup",
            },
            replace: true,
        });
    };







    return (
        <div
            className="relative flex min-h-screen w-full flex-col items-center justify-center 
            bg-(--primary-bg-color) transition-colors"
        >
            <Suspense fallback={<SignupSkeleton />}>
                <SignupForm
                    form={form}
                    errors={errors}
                    loading={submitting}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </Suspense>
        </div>
    );
}
