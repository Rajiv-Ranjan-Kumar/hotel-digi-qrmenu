import { api } from "../ api";
import type { Hotel, HotelSchemaFilter } from "../../types/hotel";





const BASE_URL = "/hotels";






export const get_maneger_initial_data = async () => {
    const url = BASE_URL + "/manager/initial-data";
    const resp = await api.get<{items: Hotel[], count: number}>(url);
    return resp;
};









export const get_and_filter_hotels = async ({filters, user_id,}: { filters?: HotelSchemaFilter;  user_id?: number;}) => {
    const url = BASE_URL + "/hotel";

    // Prepare query params, skip undefined/null
    const params: Record<string, string | number> = {};

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params[key] = value as string | number;
            }
        });
    }

    if (user_id !== undefined) params.user_id = user_id;

    const resp = await api.get(url, params);
    return resp;
};
