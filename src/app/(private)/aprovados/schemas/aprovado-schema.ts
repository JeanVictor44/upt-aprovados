import { z } from "zod";

export const AprovadoSchema = z.object({
    id: z.string(),
    name: z.string({
        message: 'O nome é obrigatório',
    }).trim().min(1, {
        message: 'O nome é obrigatório',
    }),
    phone: z.string().optional().refine((telefone) => {
        if(telefone && telefone.length < 15) return false
        
        return true
    },{
        message: 'O telefone está incompleto',
    }),
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
    institutionId: z.string({
        message: 'A instituição é obrigatória',
    }).trim().min(1, {
        message: 'A instituição é obrigatória',
    }),
    institutionLocation: z.string({
        message: 'O local da instituição é obrigatório',
    }).trim().min(1, {
        message: 'O local da instituição é obrigatório',
    }),
    courseId: z.string({
        message: 'O curso é obrigatório',
    }).trim().min(1, {
        message: 'O curso é obrigatório',
    }),
    placing: z.string().optional().transform((value) => {
        if (value) {
            return value.split('º')[0];
        }
        return value;
    }),
    selectionTypeId: z.string({
        message: 'O tipo de seleção é obrigatório',
    }).trim().min(1, {
        message: 'O tipo de seleção é obrigatório',
    }),
    year: z.string({
        message: 'O ano é obrigatório',
    }).trim().min(4, {
        message: 'O ano deve conter 4 dígitos',
    }),
});
