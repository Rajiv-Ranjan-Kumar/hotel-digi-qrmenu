import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";



export default function FAQSection() {
    const faqs = [
        {
            question: "How long does it take to set up?",
            answer: "Setup is quick and easy! You can have your digital menu live in under an hour. We provide a simple dashboard to upload your menu items, descriptions, and images.",
        },
        {
            question: "Does this integrate with my existing POS system?",
            answer: "Our Pro and Enterprise plans offer integration with most major hotel POS systems. Please contact our sales team to discuss your specific system requirements.",
        },
        {
            question: "Can I customize the menu with my hotel's branding?",
            answer: "Yes! The Enterprise plan includes options for full customization, allowing you to incorporate your hotel's logo, colors, and fonts for a seamless brand experience.",
        },
        {
            question: "Is there a free trial available?",
            answer: "Yes, we offer a 14-day free trial on our Basic and Pro plans. No credit card is required to get started.",
        },
    ];



    return (
        <section id="faq" className="mx-auto w-full max-w-3xl py-16 md:py-24">

            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 text-center"
            >
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.015em] text-(--primary-text-color)">
                    Frequently Asked Questions
                </h2>
            </motion.div>

            {/* FAQ List */}
            <div className="mt-10 space-y-4">
                {faqs.map((faq, index) => (
                    <motion.details
                        key={index}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: index * 0.12 }}
                        viewport={{ once: true }}
                        className="group rounded-lg border border-(--secondary-text-color)/30 bg-(--secondary-bg-color) p-6 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-(--primary-text-color)">
                            {faq.question}

                            <ChevronDownIcon className="h-6 w-6 text-(--accent-color) transition-transform duration-300 group-open:rotate-180" />
                        </summary>

                        <p className="group-open:mt-4 text-(--secondary-text-color)">
                            {faq.answer}
                        </p>
                    </motion.details>
                ))}
            </div>
        </section>
    );
}
