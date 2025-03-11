import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()

    const {data} = await supabase.from('tipo_curso').select('*')


    return new Response(JSON.stringify({ data }), {
        headers: { 'Content-Type': 'application/json' }
    })
}