import { Polo } from "@/types/polo"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
    const supabase = await createClient()
    const url = new URL(request.url)
    const poloId = url.searchParams.get('polo_id')

    if (!poloId) {
        return new Response('polo_id is required', { status: 400 })
    }

    const { data } = await supabase
        .from('extensao')
        .select('*')
        .eq('polo_id', poloId) as { data: Polo[] }
    
        console.log(data)

    return new Response(JSON.stringify({ data }), {
        headers: { 'Content-Type': 'application/json' }
    })
}