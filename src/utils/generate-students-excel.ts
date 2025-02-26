import { saveAs } from 'file-saver'
import Excel from 'exceljs'
import { createHeaderExcel} from "./create-header-excel"
import { createRowTitle } from "./create-row-title"

import { STUDENT_COLUMNS } from "../constants/student-columns-name"
import { createClient } from './supabase/client'
import { redirect } from 'next/navigation'
import {styleRowData} from './style-row-data'
import { Domain } from '@/types/domain'

interface AprovadoQuery  {
    id: number;
    name: string;
    phone: string;
    year: number;
    placing: number;
    institution: {
        id: number;
        name: string;
    };
    institutionLocation: string;
    createdAt: string;
    updatedAt: string;
    polo: {
        id: number;
        name: string;
    };
    extensao: {
        id: number;
        name: string;
    };
    course: {
        id: number;
        name: string;
        tipo_curso: {
            id: number;
            name: string;
        },
    };
    selectionType: {
        id: number;
        name: string;
    },
    nome_gestor: string;
}
const generateStudentsExcel = async() => {
    const workbook = new Excel.Workbook()
    try {
        const workSheet = workbook.addWorksheet('Lista de aprovações', {views: [{showGridLines:false}]})
        createHeaderExcel(workSheet, workbook)
        createRowTitle(workSheet, ['N°', 'ALUNO', 'TELEFONE DE CONTATO', 'CURSO DE APROVAÇÃO', 'MODALIDADE DA GRADUAÇÃO', 'UNIVERSIDADE/FACULDADE', 'LOCAL/MUNICÍPIO DA \n UNIVERSIDADE/FACULDADE', 'TIPO DE SELEÇÃO', 'COLOCAÇÃO NO VESTIBULAR/PROCESSO SELETIVO', `MUNICÍPIO/EXTENSÃO DA TURMA UPT ${new Date().getFullYear()}`, 'POLO','ANO DE EDIÇÃO DO UPT', 'GESTOR'], /[a-m]/gi, STUDENT_COLUMNS)
        
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            redirect('/login')
        }
        
        let aprovados:AprovadoQuery[] = [];

        const {data: tiposCurso} = await supabase
        .from('tipo_curso')
        .select('id, name')
        
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
                course:curso_id(id, name, tipo_curso_id), 
                selectionType:tipo_selecao_id(id, name),
                nome_gestor
            `);

            if(!data || data.length === 0) {
                return alert('Nenhum aluno encontrado')
            }

            if(error) {
                console.error(error)
            }

            aprovados = data.map((aprovado) => ({
                ...aprovado,
                course: {
                    id:(aprovado.course as unknown as Domain).id,
                    name: (aprovado.course as unknown as Domain).name,
                    tipo_curso: tiposCurso?.find((tipoCurso) => tipoCurso.id === (aprovado.course as unknown as {tipo_curso_id: number})?.tipo_curso_id)?.name
                }
            })) as unknown as AprovadoQuery[]
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
                course:curso_id(id, name, tipo_curso_id), 
                selectionType:tipo_selecao_id(id, name),
                nome_gestor
            `)
            .eq('polo_id', user.user_metadata.polo_id);

            if(!data || data.length === 0) {
                return alert('Nenhum aluno encontrado')
            }

            if(error) {
                console.error(error)
            }

            aprovados = data.map((aprovado) => ({
                ...aprovado,
                course: {
                    id:(aprovado.course as unknown as Domain).id,
                    name: (aprovado.course as unknown as Domain).name,
                    tipo_curso: tiposCurso?.find((tipoCurso) => tipoCurso.id === (aprovado.course as unknown as {tipo_curso_id: number})?.tipo_curso_id)?.name
                }
            })) as unknown as AprovadoQuery[]
        }
        // Insert supabase data
        aprovados.forEach((singleData, index) => {
            const newSingleData = {
                number: index + 1,
                name: singleData?.name,
                phone: singleData?.phone ? singleData?.phone : 'Não informado',
                course: (singleData?.course as unknown as Domain)?.name,
                institution: (singleData?.institution as unknown as {name: string})?.name,
                institutionLocation: singleData?.institutionLocation,
                selectionType: (singleData?.selectionType as unknown as Domain)?.name,
                placing: singleData?.placing ? singleData?.placing + '°': 'Não informado',
                extensao: (singleData?.extensao as unknown as Domain)?.name,
                polo: (singleData?.polo as unknown as Domain)?.name,
                editionYear: singleData?.year,
                nome_gestor: singleData?.nome_gestor,
                tipo_curso: singleData?.course?.tipo_curso
            }
            workSheet.addRow(newSingleData)
        })

        styleRowData(workSheet)

        const buffer = await workbook.xlsx.writeBuffer()
        saveAs(new Blob([buffer]), `Lista de aprovados.xlsx`)
    } catch (err) {
        console.error(err)
    } finally {
        workbook.removeWorksheet('Lista de aprovações');
    }
}
export default generateStudentsExcel