import fs from "fs";
import { PdfReader } from "pdfreader";
import * as XLSX from "xlsx";

export async function GET() {
  const STARTS_WITH_INSCRICAO = "6250";

  function readPdfIncricoesResultados(): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      const listaInscricoesResultados: unknown[] = [];

      const pathsResultadosUneb = [
          'ResultadoUneb-Vest2025-S1O1.pdf', 
          'ResultadoUneb-Vest2025-S1O2 (1) 2 op 1 sem.pdf', 
          'ResultadoUneb-Vest2025-S1O2 (1) 2 op 2 sem.pdf',
          'ResultadoUneb-Vest2025-S2O1 1 opc 2 sem.pdf',
        ]
      
      try {
        let nextIsName = false;

        for (const path of pathsResultadosUneb) {

          const pdfBuffer = fs.readFileSync(`public/${path}`);
          new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
            if (err) {
              console.error("Error reading PDF:", err);
              reject(err);
            } else if (!item) {
              console.warn("End of PDF parsing");
              resolve(listaInscricoesResultados);
            } else if (item.text) {

              if(nextIsName) {
                listaInscricoesResultados[listaInscricoesResultados.length - 1] = {
                  Inscricao: listaInscricoesResultados[listaInscricoesResultados.length - 1],
                  Nome: item.text,
                }
                nextIsName = false
              }

              if(item.text.startsWith(STARTS_WITH_INSCRICAO)) {
                const inscricao = item.text;
                const inscricaoExists = listaInscricoesResultados.find((candidato) => {
                  return (candidato as {Inscricao: string})?.Inscricao === inscricao;
                })

                if(!inscricaoExists){
                  listaInscricoesResultados.push(item.text);
                  nextIsName = true
                }
              }
            }
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }


  function readPdfIncricoesCandidatos(): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      const listaInscricoesCandidatos: unknown[]= [];
      try {
        const pdfBuffer = fs.readFileSync("public/siv_candidatosSelecionados_12-11-2024_14.27.31.pdf");
        new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
          if (err) {
            console.error("Error reading PDF:", err);
            reject(err);
          } else if (!item) {
            console.warn("End of PDF parsing");
            resolve(listaInscricoesCandidatos);
          } else if (item.text && item.text.startsWith(STARTS_WITH_INSCRICAO)) {
            listaInscricoesCandidatos.push(item.text);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  try {
    const listaInscricoesResultados = await readPdfIncricoesResultados();
    const listaInscricoesCandidatos = await readPdfIncricoesCandidatos();

    const newList = listaInscricoesResultados.filter((candidato) => {
        const inscricaoResultado = (candidato as {Inscricao: string})?.Inscricao as string; 
        return listaInscricoesCandidatos.includes(inscricaoResultado);
    })

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(newList);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidatos");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    console.log("Inscrições encontradas em ambas as listas:", newList);
    return new Response(excelBuffer, { 
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=candidatos.xlsx"
      }
     });
  } catch (error) {
    console.error(error)
    return new Response("Erro ao processar PDF", { status: 500 });
  }
}