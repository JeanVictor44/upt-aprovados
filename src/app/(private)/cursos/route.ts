import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()
    
    const { data: cursos } = await supabase
        .from('curso')
        .select(`
            id,
            name,
            tipo_curso: tipo_curso_id(id, name)    
        `)

    return new Response(JSON.stringify({ data: cursos }), {
        headers: { 'Content-Type': 'application/json' }
    })
}