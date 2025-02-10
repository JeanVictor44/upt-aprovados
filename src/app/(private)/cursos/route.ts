import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()
    
    const { data: cursos } = await supabase
        .from('curso')
        .select('*')

    return new Response(JSON.stringify({ data: cursos }), {
        headers: { 'Content-Type': 'application/json' }
    })
}