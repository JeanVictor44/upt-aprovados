import { createClient } from '@/utils/supabase/server';

export async function GET (request: Request) {
    const supabase = await createClient()
    const queryParam = new URL(request.url).searchParams.get('query') as string;
    const poloId = new URL(request.url).searchParams.get('polo');

    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
    });
    if (usersError) {
        console.error("Error fetching users:", usersError);
        return;
    }

    const users = usersData.users.filter(user => user.user_metadata.polo_id ).filter((usuario) => {
        if (!queryParam && !poloId) return true;
        if(queryParam && !poloId) {
            return usuario.user_metadata.name.toLowerCase().includes(queryParam?.toLowerCase()) || 
                   String(usuario.email).toLowerCase().includes(queryParam?.toLowerCase());
        }
        if(!queryParam && poloId) {
            return usuario.user_metadata.polo_id == poloId;
        }
        
        return (usuario.user_metadata.name.toLowerCase().includes(queryParam?.toLowerCase()) || 
               String(usuario.email).toLowerCase().includes(queryParam?.toLowerCase()) ) &&
               usuario.user_metadata.polo_id == poloId;
    });
    const poloIds = [...new Set(users.map(user => user.user_metadata.polo_id))]; 

    const { data: polos, error: polosError } = await supabase
        .from('polo')
        .select('id, name')
        .in('id', poloIds); 

    if (polosError) {
        console.error("Error fetching polos:", polosError);
        return;
    }

    const usersWithPolo = users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.user_metadata.name,
        polo: {
            id: user.user_metadata.polo_id,
            name: polos.find(polo => polo.id === user.user_metadata.polo_id)?.name || "Usuário sem polo"
        },
        is_admin: user.user_metadata.is_admin,
        is_active: user.user_metadata.is_active
     }));


    return new Response(JSON.stringify({ data: usersWithPolo }), {
        headers: { 'Content-Type': 'application/json' }
    })
}