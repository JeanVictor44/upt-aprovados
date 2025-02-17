import { z } from "zod";


export const UsuarioSchema = z.object({
    id: z.string(),
    name: z.string({
        message: 'O nome é obrigatório'
    }).trim().min(1, {
        message: 'O nome é obrigatório',
    }),
    isAdmin: z.boolean().default(false),
    isActive: z.boolean(),
    email: z.string({
        message: 'O e-mail é obrigatório',
    }).trim().min(1, {
        message: 'O e-mail é obrigatório',
    }),
    poloId: z.string({
        message: 'O polo é obrigatório'
    }).trim().min(1, {
        message: 'O polo é obrigatório',
    }),
    password: z.string({
        message: 'A senha é obrigatória'
    }).trim().min(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    })
})
