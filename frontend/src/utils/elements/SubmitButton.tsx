interface SubmitButtonProps {
    loading?: boolean;
    text: string;
}






export default function SubmitButton({ loading = false, text = "Submit" }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 
                bg-(--accent-color) hover:bg-(--hover-accent-color)
                text-(--primary-text-color) font-bold py-2.5 rounded-lg 
                transition disabled:opacity-60 disabled:cursor-not-allowed`
            }
        >
            {loading && (
                <span className="w-4 h-4 border-2 border-(--primary-text-color) border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Please wait..." : text}
        </button>
    );
}
