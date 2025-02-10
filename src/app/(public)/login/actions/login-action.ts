'use server'
import { createClient } from '@/utils/supabase/server'
import { FormState } from '@/types/form-state'
import { Login } from '../types/Login'

type LoginFormState = FormState<Login> 

export async function loginAction(prevState: LoginFormState | undefined, formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  console.log(error)
  if (error) {
    if(error.code === 'invalid_credentials') {
      return {
        errors: {
          email: ['Email ou senha inválidos'],
          password: [],
        },
      }
    }
  }
}
