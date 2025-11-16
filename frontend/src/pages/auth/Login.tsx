import { useState } from "react";
import { Card, Button, Label, TextInput, Spinner } from "flowbite-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--primary-bg-color)] text-[var(--primary-text-color)] p-4">
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <Card className="border-none bg-[var(--secondary-bg-color)] shadow-xl shadow-black/30 rounded-2xl p-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-center mb-2"
                    >
                        Welcome Back 👋
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center text-[var(--secondary-text-color)] mb-6"
                    >
                        Login to continue your journey
                    </motion.p>

                    <div>
                        <div className="mb-4">
                            <Label htmlFor="email" />
                            <TextInput
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="
        bg-[var(--primary-bg-color)]
        border-none 
        focus:ring-[var(--accent-color)]
        px-3 py-3
    "
                            />

                        </div>

                        <div className="mb-4">
                            <Label htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="bg-[var(--primary-bg-color)] border-none focus:ring-[var(--accent-color)]"
                            />
                        </div>

                        <div className="flex justify-end text-sm mb-4">
                            <Link
                                to="/forgot-password"
                                className="text-[var(--accent-color)] hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            color="success"
                            className="w-full !bg-[var(--accent-color)] hover:!bg-[var(--hover-accent-color)]"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? <Spinner /> : "Login"}
                        </Button>
                    </div>

                    <hr className="my-4 border-[var(--secondary-text-color)]/30" />

                    <div className="text-center text-sm">
                        New here?{" "}
                        <Link
                            to="/register"
                            className="text-[var(--accent-color)] hover:underline"
                        >
                            Create Account
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
