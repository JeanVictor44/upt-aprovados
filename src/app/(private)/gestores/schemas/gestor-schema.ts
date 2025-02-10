import { z } from "zod";


export const GestorSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, {
        message: 'O nome é obrigatório',
    }),
    email: z.string({
        message: 'O e-mail é obrigatório',
    }).trim().min(1, {
        message: 'O e-mail é obrigatório',
    }).email({
        message: 'O e-mail é inválido',
    }),
    poloId: z.string().trim().min(1, {
        message: 'A senha é obrigatória',
    }),
    password: z.string().trim().min(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    })
})
