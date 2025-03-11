'use server'

import { FormState } from "@/types/form-state"
import { createClient } from "@/utils/supabase/server";
import { CreateCursoSchema } from "../schema/create-curso-schema";
import { EditCurso } from "../types/edit-curso";

type EditCursoFormState = FormState<EditCurso> 

export async function editCursoAction(prevState: EditCursoFormState | undefined, formData: FormData) {
    const validatedFields = CreateCursoSchema.safeParse({
        name: formData.get('name'),
        tipo_curso_id: formData.get('tipo_curso_id'),
        area_conhecimento_id: formData.get('area_conhecimento_id'),
        id: formData.get('id'),
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    
    const {name, tipo_curso_id, area_conhecimento_id} = validatedFields.data
    const supabase = await createClient()

    const { error } = await supabase.from('curso').update({
        name, 
        tipo_curso_id, 
        area_conhecimento_id 
    }).eq('id', formData.get('id'))

    if (error) {
       console.error('Error editing curso:', error)
    }else {
        return {
            errors: {},
        }
    }
}