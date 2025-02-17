import { createClient } from "@/utils/supabase/server";

export async function DELETE(request: Request) {
    const supabase = await createClient();

    const aprovaodoId = request.url.split('/').pop() as string;
    await supabase
          .from('aprovado')
          .delete()
          .eq('id', aprovaodoId);
    
    return new Response("User deleted", { status: 200 });
}
