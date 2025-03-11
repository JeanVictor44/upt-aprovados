import { Domain } from "@/types/domain";

export type Curso = {
    id: number;
    name: string;
    tipo_curso: Domain;
    area_conhecimento: Domain;
}