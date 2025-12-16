import { motion } from "framer-motion";


interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}



export default function Modal({ open, onClose, children }: ModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center 
                       bg-black/50 backdrop-blur-sm z-[999]"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-(--secondary-bg-color) rounded-xl 
                           border border-(--border-color) shadow-xl 
                           p-0 w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </motion.div>
        </div>
    );
}
