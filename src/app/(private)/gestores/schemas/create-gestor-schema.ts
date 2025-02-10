import { GestorSchema } from "./gestor-schema";

export const CreateGestorSchema = GestorSchema.omit({id: true})