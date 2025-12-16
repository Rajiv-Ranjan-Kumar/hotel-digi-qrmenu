import type { UserGallery } from "../../../types/comman";

interface Props {
    images: UserGallery[];
    selectedImageId: number | null;
    onSelect: (file: File) => void;
}

export default function GalleryFooter({ images, selectedImageId, onSelect }: Props) {
    return (
        <div className="p-4 border-t border-(--border-color) flex justify-end">
            <button
                disabled={!selectedImageId}
                onClick={() => {
                    const img = images.find(i => i.id === selectedImageId);
                    if (img) {
                        fetch(img.optimized_image_url)
                            .then(res => res.blob())
                            .then(blob => onSelect(new File([blob], "image.jpg")));
                    }
                }}
                className="px-6 py-2 bg-(--accent-color) text-white rounded-lg disabled:opacity-50"
            >
                Set Image
            </button>
        </div>
    );
}
