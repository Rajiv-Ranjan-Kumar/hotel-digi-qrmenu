import { logout } from "../store/slice/userSlice";
import { store } from "../store/store";

const BASE_URL = import.meta.env.VITE_API_URL;
const TIMEOUT_MS = import.meta.env.VITE_API_TIMEOUT || 12000;


interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T | null;
}




const getHeaders = (isJSON = true) => {
    // Redux state se token fetch karo
    const token = store.getState().user.token;

    return {
        ...(isJSON ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};




// Timeout wrapper
function withTimeout<T>(promise: Promise<T>, ms = TIMEOUT_MS): Promise<T> {
    return new Promise((resolve, reject) => {
        const t = setTimeout(() => reject(new Error("Request Timeout")), ms);
        promise
            .then((res) => {
                clearTimeout(t);
                resolve(res);
            })
            .catch((err) => {
                clearTimeout(t);
                reject(err);
            });
    });
}





// Extract proper message from Django-Ninja
function extractMessage(json: unknown): string {
    if (!json || typeof json !== "object") return "Something went wrong";
    const obj = json as Record<string, unknown>;

    if (typeof obj.message === "string") return obj.message;
    if (typeof obj.detail === "string") return obj.detail;

    // Validation errors
    if (Array.isArray(obj.detail) && obj.detail.length > 0) {
        const first = obj.detail[0] as Record<string, unknown>;
        if (typeof first.msg === "string") return first.msg;
    }

    return "Something went wrong";
}





async function request<T>( endpoint: string, options: RequestInit & { isJSON?: boolean } = {}): Promise<ApiResponse<T>> {
    try {
        // Timeout protection
        const res = await withTimeout( fetch(BASE_URL + endpoint, { ...options, headers: { ...getHeaders(options.isJSON ?? true), ...(options.headers || {}) }}) );
        const json = await res.json().catch(() => null);
        console.log("API Response:", { endpoint, status: res.status, json });

        // -------------------
        // SUCCESS
        // -------------------
        if (res.ok) {
            return {
                status: true,
                message: json?.message || "Success",
                data: (json?.data ?? json ?? null) as T
            };
        }

        // -------------------
        // UNAUTHORIZED → Auto logout
        // -------------------
        if (res.status === 401) store.dispatch(logout());
        

        // -------------------
        // FAIL
        // -------------------
        return {
            status: false,
            message: extractMessage(json),
            data: null
        };
    } catch (err) {
        const msg = err instanceof Error ? err.message : "Network Error";
        return {
            status: false,
            message: msg,
            data: null
        };
    }
}




export const api = {
    get: <T>(url: string, params?: Record<string, string | number>) => {
        const qs = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : "";
        return request<T>(url + qs, { method: "GET" });
    },

    post: <T>(url: string, body?: unknown) => request<T>(url, { method: "POST", body: JSON.stringify(body) }),
    put: <T>(url: string, body?: unknown) =>  request<T>(url, { method: "PUT", body: JSON.stringify(body) }),
    delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),

    // File upload support
    upload: <T>(url: string, formData: FormData) => request<T>(url, { method: "POST", body: formData, isJSON: false })
};
