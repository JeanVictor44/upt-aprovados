import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'O email deve ser válido'
    }),
    password: z.string().min(6, {
        message: 'A senha deve ter no mínimo 6 caracteres'
    }),
})