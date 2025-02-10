import { z } from "zod";


export const AprovadoSchema = z.object({
    id: z.string(),
    name: z.string({
        message: 'O nome é obrigatório',
    }).trim().min(1, {
        message: 'O nome é obrigatório',
    }),
    phone: z.string().optional(),
    poloId: z.string({
        message: 'O polo é obrigatório',
    }).trim().min(1, {
        message: 'O polo é obrigatório',
    }),
    extensaoId: z.string({
        message: 'A extensão é obrigatória',
    }).trim().min(1, {
        message: 'A extensão é obrigatória',
    }),
    institution: z.string({
        message: 'A instituição é obrigatória',
    }).trim().min(1, {
        message: 'A instituição é obrigatória',
    }),
    institutionLocation: z.string({
        message: 'O local da instituição é obrigatório',
    }).trim().min(1, {
        message: 'O local da instituição é obrigatório',
    }),
    courseId: z.string().trim().min(1, {
        message: 'O curso é obrigatório',
    }),
    placing: z.string().optional(),
    selectionTypeId: z.string().trim().min(1, {
        message: 'O tipo de seleção é obrigatório',
    }),
    year: z.string().trim().min(4, {
        message: 'O ano deve conter 4 dígitos',
    }),
})
