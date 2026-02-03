import { InstituicaoEnsino } from "@/types/instituicao"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
    const supabase = await createClient()
    const url = new URL(request.url)
    const query = url.searchParams.get('query')
    
    let instituicoes: InstituicaoEnsino[] = []

    if(query){
      const { data } = await supabase
        .from('instituicao')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('name', { ascending: true })
        .limit(10)

      const { data: data2 } = await supabase
        .from('instituicao')
        .select('*')
        .ilike('sigla', `%${query}%`)
        .order('name', { ascending: true })
        .limit(10)

        const setInstituicoes = new Set([
            ...(data || []),
            ...(data2 || []),
        ])
        instituicoes = [...setInstituicoes] as InstituicaoEnsino[]
    }else {
        const { data } = await supabase
            .from('instituicao')
            .select('*')
            .order('name', { ascending: true })
            .limit(10)

        instituicoes = data as InstituicaoEnsino[]
    }

    return new Response(JSON.stringify({ data: instituicoes }), {
        headers: { 'Content-Type': 'application/json' }
    })
}