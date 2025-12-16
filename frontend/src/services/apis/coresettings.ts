import { api } from "../ api";
import type { Role } from "../../types/coresettings";




const BASE_URL = '/coresettings';




export const get_role = async () => {
    const url = BASE_URL + '/role';
    const resp = await api.get<Role[]>(url);
    return resp;
}