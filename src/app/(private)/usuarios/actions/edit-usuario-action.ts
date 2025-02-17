'use server'

import { FormState } from "@/types/form-state"
import { createClient } from "@/utils/supabase/server";
import { EditUsuarioSchema } from "../schemas/edit-usuario-schema";
import { EditUsuario } from "../types/edit-usuario";

type EditUsuarioFormState = FormState<EditUsuario> 

export async function editUsuarioAction(prevState: EditUsuarioFormState | undefined, formData: FormData) {
    const validatedFields = EditUsuarioSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        poloId: formData.get('poloId'),
        password: formData.get('password'),
        isAdmin: formData.get('isAdmin') === 'true' ? true : false,
        isActive: formData.get('isActive') === 'true' ? true : false,
        id: formData.get('id')
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const {email, password, id, isAdmin, name, poloId, isActive} = validatedFields?.data as EditUsuario
    const supabase = await createClient()

    const { error } = await supabase.auth.admin.updateUserById(id, {
        email,
        ...(password && {password}),
        user_metadata: {
            is_admin: isAdmin,
            is_active: isActive,
            polo_id: Number(poloId),
            name,
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