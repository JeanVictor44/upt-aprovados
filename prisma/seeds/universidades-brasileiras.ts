import { PrismaClient } from "@prisma/client";
import csv from 'csv-parser';
import fs from 'fs';
import path from "path";

const prisma = new PrismaClient();


interface InstituicaoEnsino {
    id: number;
    codigo_ies: string;
    name: string;
    sigla?: string;
    uf: string;
    codigo_municipio_ibge: string;
    municipio: string;
}

interface CSVInstituicaoEnsino {
    CODIGO_DA_IES: string;
    NOME_DA_IES: string;
    SIGLA?: string;
    UF: string;
    CODIGO_MUNICIPIO_IBGE: string;
    MUNICIPIO: string;
    SITUACAO_IES: 'Extinta' | 'Ativa';
}
  
  async function readCSV(filePath: string): Promise<InstituicaoEnsino[]> {
    return new Promise((resolve, reject) => {
      const results: InstituicaoEnsino[] = [];
  
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: CSVInstituicaoEnsino) => {
          if (data.SITUACAO_IES === 'Ativa') {
            results.push({
              codigo_ies: data.CODIGO_DA_IES,
              name: data.NOME_DA_IES,
              sigla: data?.SIGLA || '',
              uf: data.UF,
              codigo_municipio_ibge: data.CODIGO_MUNICIPIO_IBGE,
              municipio: data.MUNICIPIO,
              id: results.length + 1
            });
          }
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
export async function seedUniversidadesBrasileiras() {
  const filePath = path.join(__dirname, '..', '..','public','instituicoes.csv');
  const instituicoes = await readCSV(filePath);
  if (instituicoes.length === 0) {
    console.log('Nenhuma instituição ativa encontrada no CSV.');
    return;
  }

  for(const instituicao of instituicoes) {
    await prisma.instituicao.upsert({
       where: { id: instituicao.id },
       create: instituicao,
       update: instituicao,
     })
  };
  console.log('Seed inserida com sucesso!');

  prisma.$disconnect();
}