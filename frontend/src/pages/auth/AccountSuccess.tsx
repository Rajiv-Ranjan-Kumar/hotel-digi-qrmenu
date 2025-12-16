import { lazy, Suspense } from "react";
import AccountSuccessSkeleton from "../../components/auth/skeletons/ AccountSuccessSkeleton";
const AccountSuccessContent = lazy(() => import("../../components/auth/AccountSuccessContent "));



export default function AccountSuccess() {

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-(--primary-bg-color)">
            <Suspense fallback={<AccountSuccessSkeleton />}>
                <AccountSuccessContent /> 
            </Suspense>
        </div>
    );
}
