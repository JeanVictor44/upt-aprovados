import { saveAs } from 'file-saver'
import Excel from 'exceljs'
import { createHeaderExcel} from "./create-header-excel"
import { createRowTitle } from "./create-row-title"

import { STUDENT_COLUMNS } from "../constants/student-columns-name"
import { createClient } from './supabase/client'
import { redirect } from 'next/navigation'
import {styleRowData} from './style-row-data'
import { Domain } from '@/types/domain'

const generateStudentsExcel = async() => {
    const workbook = new Excel.Workbook()
    try {
        const workSheet = workbook.addWorksheet('Lista de aprovações', {views: [{showGridLines:false}]})
        createHeaderExcel(workSheet, workbook)
        createRowTitle(workSheet, ['N°', 'ALUNO', 'TELEFONE DE CONTATO', 'CURSO DE APROVAÇÃO', 'UNIVERSIDADE/FACULDADE', 'LOCAL/MUNICÍPIO DA \n UNIVERSIDADE/FACULDADE', 'TIPO DE SELEÇÃO', 'COLOCAÇÃO NO VESTIBULAR/PROCESSO SELETIVO', `MUNICÍPIO/EXTENSÃO DA TURMA UPT ${new Date().getFullYear()}`, 'POLO','ANO DE EDIÇÃO DO UPT'], /[a-k]/gi, STUDENT_COLUMNS)
        
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            redirect('/login')
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

        if(!aprovados || aprovados.length === 0) {
            return alert('Nenhum aluno encontrado')
        }

        if (error) {
            console.log(error);
        }

        // Insert supabase data
        aprovados.forEach((singleData, index) => {
            const newSingleData = {
                number: index + 1,
                name: singleData?.name,
                phone: singleData?.phone,
                course: (singleData?.course as unknown as Domain)?.name,
                institution: singleData?.institution_name,
                institutionLocation: singleData?.institution_location,
                selectionType: (singleData?.selectionType as unknown as Domain)?.name,
                placing: singleData?.placing,
                extensao: (singleData?.extensao as unknown as Domain)?.name,
                polo: (singleData?.polo as unknown as Domain)?.name,
                editionYear: singleData?.year
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