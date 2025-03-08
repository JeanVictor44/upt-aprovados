import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
    const supabase = await createClient()
    const query = new URL(request.url).searchParams

    const tipo_curso_id = query.get('tipo_curso_id')
    const name = query.get('name')
    
    let cursosQuery = supabase.from('curso').select(`*
        name,
        tipo_curso: tipo_curso_id (id, name),
        area_conhecimento: area_conhecimento_id (id, name)
    `)

    if (name) {
        cursosQuery = cursosQuery.ilike('name', `%${name}%`)
    }

    if (tipo_curso_id) {
        cursosQuery = cursosQuery.eq('tipo_curso_id', tipo_curso_id)
    }

    const { data: cursos } = await cursosQuery.order('name', { ascending: true })

    return new Response(JSON.stringify({ data: cursos }), {
        headers: { 'Content-Type': 'application/json' }
    })
}