import { Domain } from "@/types/domain";

export type Usuario = {
    id: string;
    name: string;
    email: string;
    password: string;
    polo: Domain;
    is_admin: boolean;
    is_active: boolean;
} 