export default function ImageGridSkeleton() {
    return (
        <>
            {Array.from({ length: 9 }).map((_, index) => (
                <div
                    key={index}
                    className="
                        relative aspect-square rounded-xl overflow-hidden
                        border border-(--border-color)
                        bg-(--secondary-bg-color)
                        animate-pulse
                    "
                >
                    <div
                        className="
                            absolute inset-0
                            bg-gradient-to-r
                            from-transparent
                            via-white/10
                            to-transparent
                        "
                    />

                    <div
                        className="
                            absolute top-1 right-1
                            h-6 w-6 rounded-full
                            bg-(--primary-bg-color)
                            border border-(--border-color)
                        "
                    />

                    <div
                        className="
                            absolute top-1 left-1
                            h-6 w-6 rounded-full
                            bg-(--primary-bg-color)
                            border border-(--border-color)
                        "
                    />
                </div>
            ))}
        </>
    );
}
