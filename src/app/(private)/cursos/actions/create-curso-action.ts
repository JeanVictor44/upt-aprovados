'use server'

import { FormState } from "@/types/form-state"
import { createClient } from "@/utils/supabase/server";
import { CreateCurso } from "../types/create-curso";
import { CreateCursoSchema } from "../schema/create-curso-schema";
 
type CreateCursoFormState = FormState<CreateCurso>

export async function createCursoAction(prevState: CreateCursoFormState | undefined, formData: FormData) {
    const validatedFields = CreateCursoSchema.safeParse({
        name: formData.get('name'),
        tipo_curso_id: formData.get('tipo_curso_id'),
        area_conhecimento_id: formData.get('area_conhecimento_id'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, tipo_curso_id, area_conhecimento_id } = validatedFields.data
    const supabase = await createClient()

    const { error } = await supabase.from('curso').insert([
        {
            name, 
            tipo_curso_id, 
            area_conhecimento_id, 
            updatedAt: new Date(),
        }
    ])

    if (error) {
        console.error('Error creating curso:', error)
    } else {
        return {
            errors: {},
        }
    }
}