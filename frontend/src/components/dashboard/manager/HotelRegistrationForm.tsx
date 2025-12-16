import { useState } from "react";
import { motion } from "framer-motion";
import { BuildingStorefrontIcon, DocumentTextIcon, PhotoIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import InputField from "../../../utils/elements/InputField";
import TextareaField from "../../../utils/elements/TextareaField";
import SubmitButton from "../../../utils/elements/SubmitButton";
import GalleryModal from "../galleryModal/GalleryModal";

interface SubmitPayload {
    name: string;
    description: string;
    logo: File | null;
}

interface HotelRegistrationFormProps {
    loading: boolean;
    onSubmit: (data: SubmitPayload) => void;
}

export default function HotelRegistrationForm({ loading, onSubmit }: HotelRegistrationFormProps) {
    const [galleryOpen, setGalleryOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        logo: null as File | null,
    });

    const [errors, setErrors] = useState<{ name?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validate = () => {
        const newErrors: { name?: string } = {};

        if (!form.name.trim()) {
            newErrors.name = "Hotel name is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        onSubmit({
            name: form.name.trim(),
            description: form.description.trim(),
            logo: form.logo,
        });
    };

    return (
        <div className="flex h-full w-full items-center justify-center bg-(--primary-bg-color)">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col w-full max-w-lg
               px-6 py-8 sm:px-10
               bg-(--secondary-bg-color)
               rounded-xl border border-(--border-color)
               shadow-xl"
            >
                {/* HEADER */}
                <div className="mb-6 text-center">
                    <h1 className="text-(--primary-text-color) text-2xl font-semibold">
                        Register Your Hotel
                    </h1>
                    <p className="text-(--secondary-text-color) text-sm mt-1">
                        Basic details to get started
                    </p>
                </div>

                {/* LOGO UPLOAD CARD */}
                <button
                    type="button"
                    onClick={() => setGalleryOpen(true)}
                    className="mb-6 flex items-center gap-4 p-4
                   rounded-lg border border-(--border-color)
                   bg-(--primary-bg-color)/40
                   hover:border-(--accent-color)
                   transition"
                >
                    <div
                        className="w-14 h-14 rounded-full
                       bg-(--primary-bg-color)
                       border border-(--border-color)
                       flex items-center justify-center"
                    >
                        {form.logo ? (
                            <PencilSquareIcon className="w-6 h-6 text-(--accent-color)" />
                        ) : (
                            <PhotoIcon className="w-7 h-7 text-(--secondary-text-color)" />
                        )}
                    </div>

                    <div className="text-left">
                        <p className="text-(--primary-text-color) text-sm font-medium">
                            Hotel Logo
                        </p>
                        <p className="text-(--secondary-text-color) text-xs">
                            {form.logo ? "Change logo" : "Upload logo (optional)"}
                        </p>
                    </div>
                </button>

                {/* FORM FIELDS */}
                <div className="flex flex-col gap-4">
                    <InputField
                        label="Hotel Name"
                        name="name"
                        value={form.name}
                        placeholder="Enter hotel name"
                        onChange={handleChange}
                        Icon={BuildingStorefrontIcon}
                        error={errors.name}
                    />

                    <TextareaField
                        label="Description (optional)"
                        name="description"
                        value={form.description}
                        placeholder="Short description about your hotel"
                        onChange={handleChange}
                        Icon={DocumentTextIcon}
                    />
                </div>

                {/* SUBMIT */}
                <div className="mt-6">
                    <SubmitButton text="Register Hotel" loading={loading} />
                </div>
            </motion.form>


            {galleryOpen && (
                <GalleryModal
                    open={galleryOpen}
                    onClose={() => setGalleryOpen(false)}
                />
            )}
        </div>
    );
}
