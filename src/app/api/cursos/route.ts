import { createClient } from "@/utils/supabase/server"

interface Curso {
    name: string,
    tipo_curso: {
        id: number,
        name: string
    },
    area_conhecimento: {
        id: number,
        name: string
    }
}
export async function GET(request: Request) {
    const supabase = await createClient()
    const query = new URL(request.url).searchParams

    const tipo_curso_id = query.get('tipo_curso_id')
    const name = query.get('query')
    
    let cursos: Curso[] = []
    
    function baseQuery(tipo_curso_id: string | null) { 
        if(tipo_curso_id){
            return supabase
                .from('curso')
                .select(`
                    id,
                    name,
                    tipo_curso: tipo_curso_id (id, name),
                    area_conhecimento: area_conhecimento_id (id, name)
                `)
                .eq('tipo_curso_id', tipo_curso_id)
        }else {
            return supabase.from('curso')
            .select(`
                id,
                name,
                tipo_curso: tipo_curso_id (id, name),
                area_conhecimento: area_conhecimento_id (id, name)
            `)
        }
    }

    if(name) {
        const { data } = await baseQuery(tipo_curso_id)
            .or(`name.ilike.%${name}%`)
            .order('name', { ascending: true })
            .returns<Curso[]>()

        cursos = data as Curso[]
    }else {
        const { data } = await  baseQuery(tipo_curso_id)
            .order('name', { ascending: true })
            .returns<Curso[]>()

        cursos = data as Curso[]
    }

    return new Response(JSON.stringify({ data: cursos }), {
        headers: { 'Content-Type': 'application/json' }
    })
}