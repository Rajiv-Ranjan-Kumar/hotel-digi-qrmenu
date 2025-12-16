const UserRole = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    CUSTOMER: 'customer',
} as const;


export type UserRole = typeof UserRole[keyof typeof UserRole];






export type Profile = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}







export type Login = {
    is_authenticated: boolean;
    access_token: string;
    profile: Profile;
}