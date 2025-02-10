import { Domain } from "@/types/domain";

export interface Aprovado {
    id: number;
    name: number;
    phone: number;
    placing: number;
    selectionType: Domain;
    institutionLocation: string;
    institution: string;
    course: Domain;
    year: string;
    polo:Domain;
    extensao: Domain;
}