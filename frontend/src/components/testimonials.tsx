import { motion } from "framer-motion";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";



export default function Testimonials() {
    const testimonials = [
        {
            quote:
                "HotelDigiQRmenu has transformed our room service. Orders are faster, more accurate, and our guests love the convenience. A must-have for any modern hotel.",
            name: "Maria Rodriguez",
            role: "General Manager, The Grand Hotel",
        },
        {
            quote:
                "The setup was incredibly easy, and the ability to update our menu instantly is a game-changer. Our upselling has increased by 20%!",
            name: "Johnathan Chen",
            role: "F&B Director, Lakeside Resorts",
        },
        {
            quote:
                "We've seen a significant improvement in operational efficiency. Our staff can focus more on guest service and less on taking orders over the phone.",
            name: "Emily White",
            role: "Owner, The Coastal Inn",
        },
    ];


    return (
        <section className="flex flex-col gap-10 px-4 py-16 md:py-24">

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 text-center"
            >
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.015em] text-(--primary-text-color)">
                    Trusted by Hoteliers Worldwide
                </h2>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-between rounded-xl border border-(--secondary-text-color)/30 bg-(--secondary-bg-color) p-8 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                    >
                        <ChatBubbleLeftRightIcon className="h-8 w-8 text-(--accent-color) opacity-80" />

                        <p className="mt-4 italic text-(--primary-text-color)">
                            “{item.quote}”
                        </p>

                        <div className="mt-6">
                            <p className="font-bold text-(--primary-text-color)">{item.name}</p>
                            <p className="text-sm text-(--secondary-text-color)">{item.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
