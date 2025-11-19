import { motion } from "framer-motion";

export default function FinalCTA() {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 rounded-xl bg-(--secondary-bg-color) px-4 py-16 text-center md:py-24 shadow-xl border border-(--secondary-text-color)/20"
        >
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold tracking-[-0.015em] text-(--primary-text-color)"
            >
                Ready to Elevate Your Guest Dining Experience?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="max-w-2xl text-base leading-normal text-(--secondary-text-color)"
            >
                Join hundreds of modern hotels improving efficiency and guest satisfaction. Start your free trial today.
            </motion.p>

            {/* CTA Button */}
            <motion.button
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="flex h-12 min-w-[84px] max-w-[480px] items-center justify-center rounded-lg bg-(--accent-color) px-6 font-bold text-(--primary-bg-color) shadow-lg hover:shadow-2xl transition-all"
            >
                Start Your Free Trial
            </motion.button>
        </motion.section>
    );
}
