import { lazy, Suspense, useState, type ChangeEvent, type FormEvent } from "react";
import { validateForm, type ValidationSchema } from "../../utils/validator";
import { login as loginApi } from "../../services/apis/auth";
import LoginSkeleton from "../../components/auth/skeletons/LoginSkeleton";
import { useAlert } from "../../contexts/AlertProvider/useAlert";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/userSlice";

const LoginForm = lazy(() => import("../../components/auth/LoginForm"));





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

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    const { showAlert } = useAlert();
    const dispatch = useDispatch();
 



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
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(form, validationRules);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;
        setSubmitting(true);

        const response = await loginApi({ data: form });

        setSubmitting(false);


        if (!response.status || !response.data) {
            showAlert("danger", response.message || "Login failed. Please try again.");
            return;
        }

        dispatch(login(response.data));
    };








    return (
        <div
            className="relative flex min-h-screen w-full flex-col items-center justify-center 
            bg-(--primary-bg-color) transition-colors"
        >
            <Suspense fallback={<LoginSkeleton />}>
                <LoginForm
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
