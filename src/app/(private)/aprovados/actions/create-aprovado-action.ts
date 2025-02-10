'use server'

import { FormState } from "@/types/form-state"
import { revalidatePath } from "next/cache";
import { CreateAprovadoSchema } from "../schemas/create-aprovado-schema";
import { createClient } from "@/utils/supabase/server";
import { CreateAprovado } from "../types/create-aprovado";

type CreateAprovadoFormState = FormState<CreateAprovado> 

export async function createAprovadoAction(prevState: CreateAprovadoFormState | undefined, formData: FormData) {
    const validatedFields = CreateAprovadoSchema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        extensaoId: formData.get('extensaoId'),
        institutionLocation: formData.get('institutionLocation'),
        institution: formData.get('institution'),
        courseId: formData.get('courseId'),
        placing: formData.get('placing'),
        selectionTypeId: formData.get('selectionTypeId'),
        year: formData.get('year'),
        poloId: formData.get('poloId'),
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const data = validatedFields.data
    const supabase = await createClient()

    const { error } = await supabase.from('aprovado').insert([
        {
            name: data.name,
            ...(data?.phone && { phone: data.phone }),
            year: data.year,
            placing: data.placing,
            institution_name: data.institution,

            institution_location: data.institutionLocation,
            extensao_id: data.extensaoId,
            updatedAt: new Date(),
            polo_id: data.poloId,

            curso_id: data.courseId,
            tipo_selecao_id: data.selectionTypeId,
            
        }
    ])

    if (error) {
      console.log('error', error)
    }else {
        return {
            errors: {},
        }
    }
    
    revalidatePath('/aprovados')
}