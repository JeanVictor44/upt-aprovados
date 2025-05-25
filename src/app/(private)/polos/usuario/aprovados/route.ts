import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    const queryParam = new URL(request.url).searchParams.get('query') as string;
    const edicaoParam = new URL(request.url).searchParams.get('edicao') as string;

    if (!user || !user.user_metadata.polo_id) {
        return new Response(JSON.stringify({ data: [] }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }
    
    let aprovados = []

    if(user.user_metadata.is_admin) {
        const { data, error } = await supabase
        .from('aprovado')
        .select(`
            id, 
            name, 
            gender,
            phone, 
            year, 
            placing,
            institution: institution_id(id, name), 
            institutionLocation, 
            createdAt, 
            updatedAt, 
            polo:polo_id(id, name), 
            extensao:extensao_id(id, name), 
            course:curso_id(id, name), 
            selectionType:tipo_selecao_id(id, name)
        `)
        
        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                headers: { 'Content-Type': 'application/json' },
                status: 500
            });
        }
        aprovados = data;
    }else {
        const { data, error } = await supabase
        .from('aprovado')
        .select(`
            id, 
            name, 
            gender,
            phone, 
            year, 
            placing,
            institution: institution_id(id, name), 
            institutionLocation, 
            createdAt, 
            updatedAt, 
            polo:polo_id(id, name), 
            extensao:extensao_id(id, name), 
            course:curso_id(id, name), 
            selectionType:tipo_selecao_id(id, name)
        `)
        .eq('polo_id', user.user_metadata.polo_id);
        
        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                headers: { 'Content-Type': 'application/json' },
                status: 500
            });
        }
        aprovados = data;
    }

    const formattedData = aprovados.map(aprovado => ({
        id: aprovado.id,
        name: aprovado.name,
        phone: aprovado.phone,
        year: aprovado.year,
        placing: aprovado.placing,
        institution: aprovado.institution,
        institution_location: aprovado.institutionLocation,
        extensao: aprovado.extensao,
        polo: aprovado.polo,
        course: aprovado.course,
        selectionType: aprovado.selectionType,
        createdAt: aprovado.createdAt,
        updatedAt: aprovado.updatedAt,
        gender: aprovado.gender,
    })).filter(aprovado => {
        if (!queryParam && !edicaoParam ) return true;
        return (queryParam ? aprovado?.name?.toLowerCase()?.includes(queryParam?.toLowerCase()) : true) && (edicaoParam ? aprovado?.year == edicaoParam : true)
    });

    return new Response(JSON.stringify({ data: formattedData }), {
        headers: { 'Content-Type': 'application/json' }
    });
}