import { MagnifyingGlassIcon, XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";



interface Props {
    search: string;
    setSearch: (val: string) => void;
    onClose: () => void;
}



export default function GalleryHeader({ search, setSearch, onClose }: Props) {
    return (
        <div
            className="
                flex flex-nowrap items-center gap-3
                px-4 py-3
                border-b
                bg-(--primary-bg-color)
                border-(--border-color)
            "
        >
            <PhotoIcon
                className="h-6 w-6 flex-shrink-0 text-(--accent-color)"
            />

            <h2
                className="
                    font-semibold text-lg
                    text-(--primary-text-color)
                    whitespace-nowrap
                "
            >
                Gallery
            </h2>

            <div className="relative flex-1 min-w-[120px] max-w-[320px]">
                <MagnifyingGlassIcon
                    className="
                        absolute left-3 top-1/2
                        h-5 w-5 -translate-y-1/2
                        text-(--secondary-text-color)
                    "
                />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search images..."
                    className="
                        w-full
                        pl-10 pr-3 py-2
                        rounded-lg
                        text-sm
                        bg-(--secondary-bg-color)
                        text-(--primary-text-color)
                        border border-(--border-color)
                        outline-none
                        focus:ring-1
                        focus:ring-(--accent-color)
                    "
                />
            </div>

            <button
                onClick={onClose}
                className="
                    p-2 rounded-lg
                    transition
                    hover:bg-(--secondary-bg-color)
                "
            >
                <XMarkIcon
                    className="h-6 w-6 text-(--secondary-text-color)"
                />
            </button>
        </div>
    );
}
