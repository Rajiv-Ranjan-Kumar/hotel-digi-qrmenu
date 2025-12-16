import { lazy, Suspense, useEffect, useRef, useState, type FormEvent, } from "react";
import { send_otp, verify_otp } from "../../services/apis/common";
import { useAlert } from "../../contexts/AlertProvider/useAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultRoutes } from "../../utils/routes/defaultRoutes";
import OtpVerificationSkeleton from "../../components/auth/skeletons/OtpVerificationSkeleton";

const OtpVerificationForm = lazy(() => import("../../components/auth/OtpVerificationForm"));




// STATE INTERFACES
interface OtpState {
    otp: string[];
}




export default function OtpVerification() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";
    const from = location.state?.from || "";

    const [otpState, setOtpState] = useState<OtpState>({ otp: Array(4).fill(""), });

    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { showAlert } = useAlert();




    // Autofocus
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);



    // Handle OTP change
    const handleOtpChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otpState.otp];
        newOtp[index] = value;

        setOtpState({ otp: newOtp });

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };




    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otpState.otp[index] && index > 0) {
            const newOtp = [...otpState.otp];
            newOtp[index - 1] = "";
            setOtpState({ otp: newOtp });
            inputRefs.current[index - 1]?.focus();
        }
    };




    const handleResend = async () => {
        setLoading(true);
        const response = await send_otp(email);
        setLoading(false);

        if (!response.status) {
            showAlert("danger", response.message || "Failed to resend OTP.");
            return;
        }

        showAlert("success", response.message || "OTP resent!");
    };




    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const finalOtp = otpState.otp.join("");

        if (finalOtp.length !== 4) {
            showAlert("danger", "Please enter 4-digit OTP.");
            return;
        }

        setVerifying(true);
        const response = await verify_otp({ email, otp: finalOtp });
        setVerifying(false);

        if (!response.status) {
            showAlert("danger", response.message || "OTP verification failed.");
            return;
        }

        if (from === "signup") navigate(defaultRoutes.accountSuccess.path);
        else if (from === "forgotpassword") navigate(defaultRoutes.resetPassword.path);
        else navigate(defaultRoutes.login.path);
    };




    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-(--primary-bg-color)">
            <Suspense fallback={<OtpVerificationSkeleton />}>
                <OtpVerificationForm
                    email={email}
                    otp={otpState.otp}
                    loading={loading}
                    verifying={verifying}
                    onChange={handleOtpChange}
                    onKeyDown={handleKeyDown}
                    onSubmit={handleSubmit}
                    onResend={handleResend}
                    inputRefs={inputRefs}
                />
            </Suspense>
        </div>
    );
}
