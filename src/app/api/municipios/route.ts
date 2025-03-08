import { createClient } from "@/utils/supabase/server"

interface Municipio {
    id: number
    name: string
}
export async function GET(request: Request) {
    const supabase = await createClient()
    const url = new URL(request.url)
    const query = url.searchParams.get('query')
    
    let municipios: Municipio[] = []

    if(query){
        const { data } = await supabase
            .from('municipio')
            .select('*')
            .or(`name.ilike.%${query}%`)
            .order('name', { ascending: true })
            .limit(10)

            municipios = data as Municipio[]
    }else {
        const { data } = await supabase
            .from('municipio')
            .select('*')
            .order('name', { ascending: true })
            .limit(10)

            municipios = data as Municipio[]
    }

    return new Response(JSON.stringify({ data: municipios }), {
        headers: { 'Content-Type': 'application/json' }
    })
}