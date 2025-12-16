interface TabsProps {
  tabIndex: number;
  setTabIndex: (index: number) => void;
}




export default function Tabs({ tabIndex, setTabIndex }: TabsProps) {
  return (
    <div
      className="
        border-b border-(--border-color)
        px-4 py-3
        bg-(--secondary-bg-color)
      "
    >
      <div className="flex flex-nowrap items-center gap-2">
        <button
          onClick={() => setTabIndex(0)}
          className={`
            flex items-center gap-2
            px-4 py-1.5
            rounded-md
            font-medium text-sm
            whitespace-nowrap
            transition
            ${
              tabIndex === 0
                ? "bg-(--accent-color) text-(--primary-text-color)"
                : "bg-(--primary-bg-color) text-(--primary-text-color) hover:bg-(--primary-bg-color)/70"
            }
          `}
        >
          <span className="material-symbols-outlined text-sm">
            photo_library
          </span>
          Your Images
        </button>

        <button
          onClick={() => setTabIndex(1)}
          className={`
            flex items-center gap-2
            px-4 py-1.5
            rounded-md
            font-medium text-sm
            whitespace-nowrap
            transition
            ${
              tabIndex === 1
                ? "bg-(--accent-color) text-(--primary-text-color)"
                : "bg-(--primary-bg-color) text-(--primary-text-color) hover:bg-(--primary-bg-color)/70"
            }
          `}
        >
          <span className="material-symbols-outlined text-sm">
            smart_toy
          </span>
          Generate with AI
        </button>
      </div>

      <p
        className="
          mt-2
          text-xs
          leading-relaxed
          text-(--secondary-text-color)
        "
      >
        {tabIndex === 0
          ? "Upload and select images from your gallery. Click an image to select or crop before using."
          : "Generate high-quality images using AI based on your description or prompts."}
      </p>
    </div>
  );
}
