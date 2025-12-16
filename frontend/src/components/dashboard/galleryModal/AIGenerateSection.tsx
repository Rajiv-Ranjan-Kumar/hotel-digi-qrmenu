export default function AIGenerateSection() {
    return (
        <div className="max-w-lg mx-auto flex flex-col gap-3">
            <textarea
                placeholder="Describe image..."
                rows={3}
                className="p-3 rounded-lg border bg-(--secondary-bg-color)"
            />
            <button className="bg-(--accent-color) text-white py-2 rounded-lg">
                Generate
            </button>
        </div>
    );
}
