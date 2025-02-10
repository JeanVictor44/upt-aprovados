import { Polo } from "@/types/polo"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()
    const {data} = await supabase.from('extensoes').select('*') as {data: Polo[]}
    const response = data.map(({id, name}) => ({id, name}))

    return Response.json({ data:response})
  }