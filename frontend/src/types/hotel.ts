import type { Branch } from "./branch";
import type { Logo } from "./comman";




export type Hotel = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  logo: Logo;
  branches: Branch[];
};




export type HotelSchemaFilter = {
  name?: string | null; 
  user_id?: number | null;
  page?: number;
  page_size?: number | null;
};
