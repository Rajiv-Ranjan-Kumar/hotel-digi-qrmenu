import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";


export default function Pricing() {
    const plans = [
        {
            name: "Basic",
            price: "$49/mo",
            priceNumber: "$49",
            priceSuffix: "/mo",
            description: "For smaller hotels and boutiques.",
            highlight: false,
            features: [
                "Up to 50 Rooms",
                "Digital Menu Creation",
                "QR Code Generation",
                "Email Support",
            ],
            buttonType: "outline",
            buttonText: "Choose Plan",
        },
        {
            name: "Pro",
            price: "$99/mo",
            priceNumber: "$99",
            priceSuffix: "/mo",
            description: "For mid-sized to large hotels.",
            highlight: true,
            features: [
                "Up to 200 Rooms",
                "All Basic Features",
                "POS Integration",
                "Analytics Dashboard",
                "Priority Support",
            ],
            buttonType: "filled",
            buttonText: "Choose Plan",
        },
        {
            name: "Enterprise",
            price: "Contact Us",
            description: "For large chains and resorts.",
            highlight: false,
            features: [
                "Unlimited Rooms",
                "All Pro Features",
                "Custom Branding",
                "Dedicated Account Manager",
            ],
            buttonType: "outline",
            buttonText: "Contact Sales",
        },
    ];

    return (
        <section id="pricing" className="flex flex-col gap-10 px-4 py-16 md:py-24">

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 text-center"
            >
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.015em] text-(--primary-text-color)">
                    Flexible Pricing for Every Hotel
                </h2>
                <p className="max-w-3xl text-base text-(--secondary-text-color)">
                    Choose the plan that's right for your business. No hidden fees. Cancel
                    anytime.
                </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: index * 0.15 }}
                        viewport={{ once: true }}
                        className={`relative flex flex-col rounded-xl p-8 shadow-lg transition-all hover:-translate-y-2 ${plan.highlight
                            ? "border-2 border-(--accent-color) bg-(--secondary-bg-color)"
                            : "border border-(--secondary-text-color) bg-(--secondary-bg-color)"
                            }`}
                    >
                        {plan.highlight && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-(--accent-color) px-4 py-1 text-sm font-bold text-(--primary-bg-color)">
                                Most Popular
                            </span>
                        )}

                        {/* Title */}
                        <h3 className="text-xl font-bold text-(--primary-text-color)">
                            {plan.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-(--secondary-text-color)">
                            {plan.description}
                        </p>

                        {/* Price */}
                        {plan.name !== "Enterprise" ? (
                            <p className="mt-6 text-5xl font-black text-(--primary-text-color)">
                                {plan.priceNumber}
                                <span className="text-lg font-medium text-(--secondary-text-color)">
                                    {plan.priceSuffix}
                                </span>
                            </p>
                        ) : (
                            <p className="mt-6 text-3xl font-bold text-(--primary-text-color)">
                                {plan.price}
                            </p>
                        )}

                        {/* Features */}
                        <ul className="mt-8 space-y-4">
                            {plan.features.map((feature, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center gap-3 text-(--primary-text-color)"
                                >
                                    <CheckCircleIcon className="h-6 w-6 text-(--accent-color)" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* Button */}
                        {plan.buttonType === "filled" ? (
                            <button className="mt-8 w-full rounded-lg bg-(--accent-color) py-3 font-bold text-(--primary-bg-color) shadow-md hover:opacity-90 transition-all">
                                {plan.buttonText}
                            </button>
                        ) : (
                            <button className="mt-8 w-full rounded-lg bg-(--accent-color)/15 py-3 font-bold text-(--accent-color) border border-(--accent-color)/40 hover:bg-(--accent-color)/25 transition-all">
                                {plan.buttonText}
                            </button>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
