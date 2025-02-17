import { z } from "zod";
import { UsuarioSchema } from "./usuario-schema";

export const EditUsuarioSchema = UsuarioSchema.omit({password:true}).extend({
    password: z.string().optional().refine((password) => {
        return password && password.length < 6 ? false : true
    }, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    })
})