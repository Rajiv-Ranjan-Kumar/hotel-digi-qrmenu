import { QrCodeIcon, BookOpenIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";




export default function Workflow() {
    const steps = [
        {
            icon: QrCodeIcon,
            title: "1. Scan the QR",
            description: "Guests scan a unique QR code in their room or at the table.",
        },
        {
            icon: BookOpenIcon,
            title: "2. Explore the Menu",
            description:
                "Browse a visually rich, up-to-date digital menu on their device.",
        },
        {
            icon: ShoppingCartIcon,
            title: "3. Place Your Order",
            description:
                "Select items, customize, and send the order directly to the kitchen.",
        },
    ];

    return (
        <section className="flex flex-col gap-10 px-4 py-16 md:py-24">
            {/* Heading with animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 text-center"
            >
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.015em] text-(--primary-text-color)">
                    Simple as 1-2-3
                </h2>
                <p className="max-w-3xl text-base text-(--secondary-text-color)">
                    A seamless experience for your guests from table to kitchen.
                </p>
            </motion.div>

            {/* Steps */}
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3">
                {steps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-4 text-center rounded-xl p-6 hover:-translate-y-2 transition-all"
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--secondary-bg-color) border-2 border-(--accent-color) shadow-lg">
                                <Icon className="h-10 w-10 text-(--accent-color)" />
                            </div>

                            <h3 className="text-xl font-bold text-(--primary-text-color)">
                                {step.title}
                            </h3>

                            <p className="text-(--secondary-text-color)">
                                {step.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
