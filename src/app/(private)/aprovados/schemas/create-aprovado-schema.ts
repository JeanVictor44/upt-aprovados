import { AprovadoSchema } from "./aprovado-schema";

export const CreateAprovadoSchema = AprovadoSchema.omit({id: true})

export const CreateAprovadoSchemaWithoutPolo = CreateAprovadoSchema.omit({poloId: true})