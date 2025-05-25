import { Domain } from "@/types/domain";

export interface Aprovado {
    id: number;
    name: string;
    phone: string;
    placing: string;
    selectionType: Domain;
    institution_location: string;
    institution: {
        id: number;
        name: string;
    };
    course: Domain;
    year: string;
    polo:Domain;
    extensao: Domain;
    gender: string;
}