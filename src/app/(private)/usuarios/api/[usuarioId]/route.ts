import { createClient } from "@/utils/supabase/server";

export async function DELETE(request: Request) {
    const supabase = await createClient();

    const usuarioId = request.url.split('/').pop() as string;
    await supabase.auth.admin.deleteUser(usuarioId);
    
    return new Response("User deleted", { status: 200 });
}
