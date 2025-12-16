import { lazy, Suspense, useState, type ChangeEvent, type FormEvent } from "react";
import { validateForm, type ValidationSchema } from "../../../utils/validator";
import HotelRegistrationSkeleton from "../../../components/dashboard/manager/Skeleton/HotelRegistrationSkeleton";
import { useAlert } from "../../../contexts/AlertProvider/useAlert";
import { useDispatch } from "react-redux";
// import { registerHotel as registerHotelApi } from "../../../services/apis/hotel";
// import { addHotel } from "../../../store/slice/hotelSlice";



const HotelRegistrationForm = lazy(() => import("../../../components/dashboard/manager/HotelRegistrationForm"));



// Form State Types
interface FormState {
    name: string;
    description: string;
    logo: File | null;
}

interface ErrorState {
    name?: string;
    description?: string;
    logo?: string;
}






export default function HotelRegistration() {
    const [form, setForm] = useState<FormState>({
        name: "",
        description: "",
        logo: null,
    });

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    const { showAlert } = useAlert();
    const dispatch = useDispatch();





    // 🎯 Handle Input Change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });

        setErrors((prev) => ({ ...prev, [name]: "" }));
    };





    // 🎯 Handle Logo Upload
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        setForm({ ...form, logo: file });

        setErrors((prev) => ({ ...prev, logo: "" }));
    };






    // Validation Rules
    const validationRules: ValidationSchema = {
        name: { required: true },
        description: { required: true, minLength: 10 },
        logo: { required: true },
    };




    
    // 🎯 Handle Submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(form, validationRules);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        // setSubmitting(true);
        // const response = await registerHotelApi({ data: form });
        // setSubmitting(false);

        // if (!response.status || !response.data) {
        //     showAlert("danger", response.message || "Registration failed.");
        //     return;
        // }

        // dispatch(addHotel(response.data));
        // showAlert("success", "Hotel registered successfully!");
    };

    return (
        <Suspense fallback={<HotelRegistrationSkeleton />}>
            <HotelRegistrationForm
                form={form}
                errors={errors}
                loading={submitting}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
            />
        </Suspense>
    );
}
