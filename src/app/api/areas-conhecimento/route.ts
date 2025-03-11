import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()

    const {data} = await supabase.from('area_conhecimento').select('*')

    return new Response(JSON.stringify({ data }), {
        headers: { 'Content-Type': 'application/json' }
    })
}