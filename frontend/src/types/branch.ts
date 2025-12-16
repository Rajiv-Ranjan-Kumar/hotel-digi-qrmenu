export type Branch = {
  id: number;
  hotel: number;
  name: string;
  address: string;
  country: string | null;
  state: string | null;
  city: string | null;
  pincode: string | null;
  latitude: string | null;
  longitude: string | null;
  is_active: boolean;
  created_at: string;
}
