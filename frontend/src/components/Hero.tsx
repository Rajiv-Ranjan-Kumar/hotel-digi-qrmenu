import { Button } from "flowbite-react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="py-20 text-center px-4">

            {/* Heading Animation */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-(--primary-text-color)"
            >
                Elevate Your Guest Experience.
                <br />
                The Future of Hotel Dining.
            </motion.h1>

            {/* Subtext Animation */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto mt-4 text-(--secondary-text-color)"
            >
                Modernize your room service and restaurant ordering with our seamless digital menu system.
            </motion.p>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
            >
                <Button
                    className="h-12 px-8 mt-6 mx-auto font-bold bg-(--accent-color) hover:bg-(--hover-accent-color) text-white shadow-lg"
                >
                    Get Started
                </Button>
            </motion.div>

            {/* Hero Image Animation */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-10 max-w-4xl mx-auto"
            >
                <img
                    className="aspect-video w-full rounded-xl object-cover shadow-2xl shadow-black/30 md:aspect-2/1"
                    alt="Digital menu tablet in a luxury hotel room"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCekFYzkt5aCLtpL8mf8cIWPtY89lPsxOKqQzW_ZH8RKrEF94LxZSgYxMKXham_jhCcag3gup6qGAFg8QsUUB73IZGlkxe7S_2G2ScZyvl3MrejBU7Gow1Va0Xa_cy49F0C1tclcK6Qt8ymqbVsEqo3FKm2tQUf2hDA8J1vpVMCq0RYt-P-qf56Vdxk9AXXwRr4uG0qncEsPfFJHLdAFyYwFE-TAnlh9WwBmvCkD6rJNbljOCJWEmKhBFYCyuCY0RU0CgLn8xnzmnU"
                />
            </motion.div>
        </section>
    );
}
