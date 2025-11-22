import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SubmitButton from "../../utils/elements/SubmitButton";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";






export default function OtpVerification() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";
    const from = location.state?.from || "";

    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);





    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);






    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };






    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
        }
    };






    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            alert("Please enter 6-digit OTP");
            return;
        }

        alert(`OTP Verified: ${finalOtp}`);


        if (from === "signup") navigate(defaultRoutes.resetPassword.path);
        else if (from === "forgotpassword") navigate(defaultRoutes.resetPassword.path);
        else navigate(defaultRoutes.login.path);
    };







    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-(--primary-bg-color)">
            <motion.form
                onSubmit={handleSubmit}
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
                <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
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

                <SubmitButton text="Verify OTP" loading={false} />

                {/* RESEND */}
                <div className="text-center">
                    <p className="text-(--secondary-text-color)">
                        Didn’t receive code?{" "}
                        <button
                            type="button"
                            onClick={() => alert("OTP Resent")}
                            className="font-semibold text-(--primary-text-color) hover:text-(--accent-color)"
                        >
                            Resend OTP
                        </button>
                    </p>
                </div>
            </motion.form>
        </div>
    );
}
