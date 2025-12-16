import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onChange, loading }) => {
  const generatePages = () => {
    let pages: (number | "...")[] = [];

    if (page > 2) pages.push(1);
    if (page > 3) pages.push("...");
    if (page > 1) pages.push(page - 1);
    pages.push(page);
    if (page < totalPages) pages.push(page + 1);
    if (page < totalPages - 2) pages.push("...");
    if (page < totalPages - 1) pages.push(totalPages);

    return pages;
  };

  const btnBase =
    "flex items-center justify-center h-9 px-4 rounded-lg transition text-sm font-medium";

  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-(--secondary-text-color)">
      <p className="mb-4 sm:mb-0">
        Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, totalPages * 10)} of{" "}
        {totalPages * 10} results
      </p>

      <div className="flex items-center gap-2">

        {/* Prev Button */}
        <button
          disabled={page === 1 || loading}
          onClick={() => onChange(page - 1)}
          className={`
            ${btnBase}
            ${
              page === 1 || loading
                ? "bg-(--secondary-bg-color)/40 text-(--secondary-text-color) cursor-not-allowed opacity-50"
                : "bg-(--secondary-bg-color) hover:bg-(--secondary-bg-color)/70 text-(--primary-text-color)"
            } cursor-pointer
          `}
        >
          <ChevronLeftIcon className="w-4 h-4 ml-1" /> &nbsp;
          {loading ? "..." : "Prev"}
        </button>

        {/* Page Numbers */}
        {generatePages().map((num, index) =>
          num === "..." ? (
            <span key={index} className="text-(--primary-text-color)">…</span>
          ) : (
            <button
              key={index}
              disabled={loading}
              onClick={() => onChange(num)}
              className={`
                ${btnBase} w-9 justify-center
                ${
                  page === num
                    ? "bg-(--accent-color) text-black shadow"
                    : loading
                    ? "bg-(--secondary-bg-color)/40 text-(--secondary-text-color) cursor-not-allowed opacity-50"
                    : "bg-(--secondary-bg-color) hover:bg-(--secondary-bg-color)/70 text-(--primary-text-color)"
                }
              `}
            >
              {loading ? "…" : num}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          disabled={page === totalPages || loading}
          onClick={() => onChange(page + 1)}
          className={`
            ${btnBase}
            ${
              page === totalPages || loading
                ? "bg-(--secondary-bg-color)/40 text-(--secondary-text-color) cursor-not-allowed opacity-50"
                : "bg-(--secondary-bg-color) hover:bg-(--secondary-bg-color)/70 text-(--primary-text-color)"
            } cursor-pointer
          `}
        >
          {loading ? "..." : "Next"}
          <ChevronRightIcon className="w-4 h-4 ml-1" />
        </button>

      </div>
    </div>
  );
};

export default Pagination;
