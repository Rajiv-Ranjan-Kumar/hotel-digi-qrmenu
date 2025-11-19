import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import { QrCodeIcon, BoltIcon, CloudArrowUpIcon, ChartBarIcon } from "@heroicons/react/24/outline";



export default function FeaturesSection() {


    const features = [
        {
            icon: QrCodeIcon,
            title: "Contactless Ordering",
            description:
                "Provide a safe and convenient way for guests to order from their own device.",
        },
        {
            icon: BoltIcon,
            title: "Instant Menu Updates",
            description:
                "Update menu items, prices, and availability in real-time across all rooms.",
        },
        {
            icon: CloudArrowUpIcon,
            title: "Operational Efficiency",
            description:
                "Reduce staff workload and minimize order errors with a direct-to-kitchen system.",
        },
        {
            icon: ChartBarIcon,
            title: "Boost Upselling",
            description:
                "Showcase specials and add-ons with high-quality images to increase average order value.",
        },
    ];


    return (
        <section
            id="features"
            className="flex flex-col gap-12 px-4 py-16 md:py-24"
        >
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 text-center"
            >
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--primary-text-color)">
                    Why Choose HotelDigiQRmenu?
                </h2>
                <p className="max-w-3xl text-base text-(--secondary-text-color)">
                    Our platform is designed to enhance operational efficiency and delight
                    your guests the moment they scan the QR code.
                </p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <Card
                                className="h-full bg-(--secondary-bg-color) border border-(--border-color)/20 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="material-symbols-outlined text-4xl text-(--accent-color)">
                                    <Icon className="h-10 w-10 text-(--accent-color)" />
                                </span>

                                <h3 className="text-lg font-bold text-(--primary-text-color)">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-(--secondary-text-color)">
                                    {item.description}
                                </p>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
