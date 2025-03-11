import { z } from "zod";

export const CreateCursoSchema = z.object({
    name: z.string({
        required_error: 'O nome do curso é obrigatório'
    }).min(1, {
        message: 'O nome do curso é obrigatório'
    }),
    tipo_curso_id: z.string({
       required_error: 'O tipo do curso é obrigatório' 
    }),
    area_conhecimento_id: z.string({
        required_error: 'A área de conhecimento é obrigatória'
    }),
})