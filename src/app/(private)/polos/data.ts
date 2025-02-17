import { Polo } from "@/types/polo";
import { createClient } from "@/utils/supabase/server";

export async function fetchPolos(): Promise<Polo[]>{
    const supabase = await createClient();

    return (await supabase.from('polo').select()).data as Polo[]
}