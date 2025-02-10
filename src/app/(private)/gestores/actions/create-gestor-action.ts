'use server'

import { FormState } from "@/types/form-state"
import { revalidatePath } from "next/cache";
import { CreateGestorSchema } from "../schemas/create-gestor-schema";
import { createClient } from "@/utils/supabase/server";
import { CreateGestor } from "../types/create-gestor";

type CreateGestorFormState = FormState<CreateGestor> 

export async function createGestorAction(prevState: CreateGestorFormState | undefined, formData: FormData) {
    const validatedFields = CreateGestorSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        poloId: formData.get('poloId'),
        password: formData.get('password')
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const {email,name,password,poloId} = validatedFields.data
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                polo_id: Number(poloId),
                is_active: true
            }
        }
    })

    if (error) {
        if(error.code === 'user_already_exists') {
            return {
                errors: {
                    email: ['Gestor já cadastrado']
                },
            }
        }
        if(error.code === 'email_address_invalid') {
            return {
                errors: {
                    email: ['Email inválido']
                },
            }
        }
    }else {
        return {
            errors: {},
        }
    }
    
    revalidatePath('/gestores')
}