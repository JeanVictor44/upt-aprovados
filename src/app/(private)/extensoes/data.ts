import { createClient } from "@/utils/supabase/server";

export async function fetchExtensoes() {
    const supabase = await createClient();

    return await supabase.from('extensoes').select('*')
}