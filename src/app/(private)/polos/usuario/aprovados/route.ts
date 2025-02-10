import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.user_metadata.polo_id) {
        return new Response(JSON.stringify({ data: [] }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    const { data: aprovados, error } = await supabase
        .from('aprovado')
        .select(`
            id, 
            name, 
            phone, 
            year, 
            placing, 
            institution_name, 
            institution_location, 
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

    const formattedData = aprovados.map(aprovado => ({
        id: aprovado.id,
        name: aprovado.name,
        phone: aprovado.phone,
        year: aprovado.year,
        placing: aprovado.placing,
        institution: aprovado.institution_name,
        institution_location: aprovado.institution_location,
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