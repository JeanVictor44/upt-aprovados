import Excel from 'exceljs'

export const styleRowData = (workSheet: Excel.Worksheet) => {
    //Uppercase all data
    workSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        const HEADER_ROW = 10
        if(rowNumber > HEADER_ROW){
            row.eachCell(cell => {                    
                workSheet.getCell(cell.address).alignment = {horizontal: "left"}
                if(!cell.address.includes('A')){
                    const valueCell = workSheet.getCell(cell.address).value?.toString() as string
                    workSheet.getCell(cell.address).value = valueCell.toUpperCase()

                }
                
                //Aplica borda apenas nas colunas anteriores a L
                if(cell.address.includes('M')){
                    return 
                }else {
                    cell.border = {
                        top: {style:'thin'},
                        left: {style:'thin'},
                        bottom: {style:'thin'},
                        right: {style:'thin'}
                    }
                }
            })
        }
    })
}
 