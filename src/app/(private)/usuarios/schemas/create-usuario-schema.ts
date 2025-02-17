import { UsuarioSchema } from "./usuario-schema";

export const CreateUsuarioSchema = UsuarioSchema.omit({id: true, isActive: true})