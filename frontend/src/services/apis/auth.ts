import { api } from "../ api";
import type { Login } from "../../types/auth";


const BASE_URL = "/accounts";










export const login = async ({ data }:{ data: object }) => {
    const url = BASE_URL + "/login";
    const resp = await api.post<Login>(url, data);
    return resp;
};





export const register_user = async ({ data }:{ data: object }) => {
    const url = BASE_URL + "/create-account";
    const resp = await api.post<Login>(url, data);
    return resp;
};





