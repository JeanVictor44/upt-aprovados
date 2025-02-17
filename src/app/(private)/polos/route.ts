import { Polo } from "@/types/polo"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()
    const {data} = await supabase.from('polo').select('*') as {data: Polo[]}
   
    return Response.json({ data })
  }