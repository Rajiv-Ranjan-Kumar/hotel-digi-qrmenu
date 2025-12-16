import React, { useState, useRef, useEffect } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";



interface FilterSelectProps {
  value: string;
  setValue: (value: string) => void;
  options: string[];
}




const FilterSelect: React.FC<FilterSelectProps> = ({ value, setValue, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);





  

  return (
    <div ref={ref} className="relative w-full min-w-30 max-w-40">
      {/* MAIN BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="
          px-4 py-2 rounded-lg bg-(--secondary-bg-color)
          border border-(--secondary-text-color)/20
          text-(--primary-text-color)
          shadow-sm hover:shadow-md transition-all duration-200
          cursor-pointer flex justify-between items-center
        "
      >
        <span>{value}</span>

        <FunnelIcon className="w-4 h-4 text-(--secondary-text-color)" />
      </div>

      {/* DROPDOWN LIST WITH ANIMATION */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="
              absolute left-0 right-0 mt-2 rounded-lg overflow-hidden z-20
              bg-(--secondary-bg-color) border border-(--secondary-text-color)/20 
              shadow-lg backdrop-blur-xl
            "
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  setValue(opt);
                  setOpen(false);
                }}
                className="
                  px-4 py-2 cursor-pointer text-(--primary-text-color)
                  hover:bg-(--accent-color)/20 transition-all
                "
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSelect;
