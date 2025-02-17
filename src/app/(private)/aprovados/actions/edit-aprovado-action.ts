'use server'

import { FormState } from "@/types/form-state"
import { revalidatePath } from "next/cache";
import { CreateAprovadoSchema } from "../schemas/create-aprovado-schema";
import { createClient } from "@/utils/supabase/server";
import { CreateAprovado } from "../types/create-aprovado";

type EditAprovadoFormState = FormState<CreateAprovado> 

export async function editAprovadoAction(prevState: EditAprovadoFormState | undefined, formData: FormData) {
    const validatedFields = CreateAprovadoSchema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        extensaoId: formData.get('extensaoId'),
        institutionLocation: formData.get('institutionLocation'),
        institutionId: formData.get('institutionId'),
        courseId: formData.get('courseId'),
        placing: formData.get('placing'),
        selectionTypeId: formData.get('selectionTypeId'),
        year: formData.get('year'),
        poloId: formData.get('poloId'),
        id: formData.get('id'),
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const data = validatedFields.data
    const supabase = await createClient()
    const { error } = await supabase.from('aprovado').update({
        name: data.name,
        ...(data?.phone && { phone: data.phone }),
        year: data.year,
        placing: Number(data.placing),
        institution_id: data.institutionId,
        institutionLocation: data.institutionLocation,
        extensao_id: data.extensaoId,
        updatedAt: new Date(),
        polo_id: data.poloId,
        curso_id: data.courseId,
        tipo_selecao_id: data.selectionTypeId,
    }).eq('id', formData.get('id')) // Assuming 'id' is the primary key to identify the record

    if (error) {
      console.log('error', error)
    }else {
        return {
            errors: {},
        }
    }
    
    revalidatePath('/aprovados')
}