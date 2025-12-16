import { api } from "../ api";
import type { UserGallery } from "../../types/comman";



const BASE_URL = "/accounts";




export const send_otp = async (email: string) => {
    const url = `${BASE_URL}/send-otp/${email}`;
    const resp = await api.post<{ message: string }>(url);
    return resp;
};






export const verify_otp = async (data: object) => {
    const url = BASE_URL + "/verify-otp";
    const resp = await api.post<{ message: string }>(url, data);
    return resp;
};






export const upload_image = async (files: File | File[], user_id: number|null = null) => {
    const url = BASE_URL + "/user-gallery";
    const formData = new FormData();

    if (Array.isArray(files))
        files.forEach(file => formData.append("files", file));
    else
        formData.append("files", files);


    if (user_id !== null) {
        formData.append("user_id", String(user_id));
    }


    const resp = await api.upload<UserGallery>(url, formData);
    return resp;
};







export const get_images = async ( user_id: number | null = null ) => {
    const params = new URLSearchParams();

    if (user_id !== null) {
        params.append("user_id", String(user_id));
    }

    const url = BASE_URL + "/user-gallery?" + params.toString();

    const resp = await api.get<{items: UserGallery[]; count: number;}>(url);
    return resp;
};
