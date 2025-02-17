import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();

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
    }));

    return new Response(JSON.stringify({ data: formattedData }), {
        headers: { 'Content-Type': 'application/json' }
    });
}