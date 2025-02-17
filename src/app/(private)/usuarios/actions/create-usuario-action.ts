'use server'

import { FormState } from "@/types/form-state"
import { CreateUsuarioSchema } from "../schemas/create-usuario-schema";
import { createClient } from "@/utils/supabase/server";
import { CreateUsuario } from "../types/create-usuario";

type CreateGestorFormState = FormState<CreateUsuario> 

export async function createUsuarioAction(prevState: CreateGestorFormState | undefined, formData: FormData) {
    const validatedFields = CreateUsuarioSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        poloId: formData.get('poloId'),
        password: formData.get('password'),
        isAdmin: formData.get('isAdmin') === 'true' ? true : false
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    
    const {email,name,password,poloId, isAdmin} = validatedFields.data
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                polo_id: Number(poloId),
                is_active: true,
                is_admin: isAdmin,
            }
        }
    })

    if (error) {
        if(error.code === 'user_already_exists') {
            return {
                errors: {
                    email: ['Usuário já cadastrado']
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
}