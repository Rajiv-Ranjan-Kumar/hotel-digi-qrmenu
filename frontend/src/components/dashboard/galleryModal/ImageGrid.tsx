import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { UserGallery } from "../../../types/comman";
import UploadSection from "./UploadSection";
import ImageGridSkeleton from "./Skeleton/ImageGridSkeleton";

interface Props {
    images: UserGallery[];
    selectedImageId: number | null;
    setSelectedImageId: (id: number) => void;
}

export default function ImageGrid({
    images,
    selectedImageId,
    setSelectedImageId,
}: Props) {

    const loading = true; // replace with real loading state

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            <UploadSection />

            {loading ? (
                <ImageGridSkeleton />
            ) : (
                images.map(img => {
                    const isSelected = selectedImageId === img.id;

                    return (
                        <div
                            key={img.id}
                            onClick={() => setSelectedImageId(img.id)}
                            className={`
                                relative aspect-square rounded-xl overflow-hidden cursor-pointer transition
                                border
                                ${isSelected
                                    ? "border-(--accent-color) ring-2 ring-(--accent-color)"
                                    : "border-(--border-color) hover:border-(--accent-color)"
                                }
                            `}
                        >
                            <img
                                src={img.optimized_image_url}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />

                            <CheckCircleIcon
                                className={`
                                    absolute top-1 right-1 h-6 w-6
                                    ${isSelected
                                        ? "text-(--accent-color)"
                                        : "text-(--primary-text-color)"
                                    }
                                `}
                            />

                            <button
                                className="
                                    absolute top-1 left-1
                                    bg-(--secondary-bg-color)
                                    border border-(--border-color)
                                    rounded-full p-1
                                    opacity-0 hover:opacity-100 transition
                                "
                                onClick={(e) => e.stopPropagation()}
                            >
                                <TrashIcon className="h-4 w-4 text-(--inactive-color)" />
                            </button>
                        </div>
                        // abc
                    );
                })
            )}
        </div>
    );
}
