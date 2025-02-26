import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()
    
    const { data } = await supabase
    .from('aprovado')
    .select('year')

    const distinctValues = [...new Set(data?.map(item => item.year))]

    return new Response(JSON.stringify({ data: distinctValues }), {
        headers: { 'Content-Type': 'application/json' }
    })
}