import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()
    
    const { data: tiposSelecao } = await supabase
        .from('tipo_selecao')
        .select('*')

    return new Response(JSON.stringify({ data: tiposSelecao }), {
        headers: { 'Content-Type': 'application/json' }
    })
}