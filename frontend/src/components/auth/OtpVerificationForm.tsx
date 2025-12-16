import { motion } from "framer-motion";

interface Props {
    email: string;
    otp: string[];
    loading: boolean;
    verifying: boolean;
    onChange: (value: string, index: number) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    onSubmit: (e: React.FormEvent) => void;
    onResend: () => void;
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}




export default function OtpVerificationForm({email,otp, loading, verifying, onChange, onKeyDown, onSubmit, onResend, inputRefs,}: Props) {
    return (
            <motion.form
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-10 w-full max-w-sm sm:max-w-lg px-6 py-8 bg-(--secondary-bg-color) rounded-xl border border-(--border-color) shadow-lg"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-center">
                        <span
                            className="material-symbols-outlined text-(--accent-color)"
                            style={{ fontSize: "50px", fontVariationSettings: "'FILL' 1" }}
                        >
                            pin
                        </span>
                    </div>

                    <h1 className="text-(--primary-text-color) text-3xl font-bold text-center">
                        OTP Verification
                    </h1>

                    <p className="text-(--secondary-text-color) text-center">
                        Enter the 6-digit code sent to <br />
                        <span className="text-(--primary-text-color) font-medium">{email}</span>
                    </p>
                </div>

                {/* OTP BOXES */}
                <div className="mx-auto flex justify-center gap-2 md:gap-6 flex-nowrap">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => void (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => onChange(e.target.value, index)}
                            onKeyDown={(e) => onKeyDown(e, index)}
                            className="
                                w-12 h-12 sm:w-14 sm:h-14
                                text-center text-xl font-semibold
                                text-(--primary-text-color)
                                bg-(--primary-bg-color)
                                border border-(--border-color)
                                rounded-lg
                                outline-none
                                focus:border-(--accent-color)
                                transition-all
                            "
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={verifying}
                    className="rounded-lg bg-(--accent-color) text-white w-full py-3 font-semibold"
                >
                    {verifying ? "Verifying..." : "Verify OTP"}
                </button>

                {/* RESEND */}
                <div className="text-center">
                    <p className="text-(--secondary-text-color)">
                        Didn’t receive code?{" "}
                        <button
                            type="button"
                            disabled={loading}
                            onClick={onResend}
                            className="font-semibold text-(--primary-text-color) hover:text-(--accent-color)"
                        >
                            {loading ? "Sending..." : "Resend OTP"}
                        </button>
                    </p>
                </div>
            </motion.form>
    );
}
