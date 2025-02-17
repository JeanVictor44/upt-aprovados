import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string({
        message: 'O email é obrigatório'
    }).min(1, {
        message: 'O email é obrigatório'
    }),
    password: z.string().min(6, {
        message: 'A senha deve ter no mínimo 6 caracteres'
    }),
})