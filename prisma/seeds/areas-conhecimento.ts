import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export enum AreasConhecimento {
   /* Bacharelado e Licenciatura */
    CIENCIAS_EXATAS_E_DA_TERRA = 1,
    CIENCIAS_BIOLOGICAS = 2,
    ENGENHARIAS_E_TECNOLOGIA = 3,
    CIENCIAS_DA_SAUDE = 4,
    CIENCIAS_AGRARIAS = 5,
    CIENCIAS_SOCIAIS_APLICADAS = 6,
    CIENCIAS_HUMANAS = 7,
    LINGUISTICA_LETRAS_E_ARTES = 8,
    /* Tecnologo */
    AMBIENTE_E_SAUDE = 9,
    CONTROLE_E_PROCESSOS_INDUSTRIAIS = 10,
    DESENVOLVIMENTO_EDUCACIONAL_E_SOCIAL = 11,
    GESTAO_E_NEGOCIOS = 12,
    INFORMACAO_E_COMUNICACAO = 13,
    INFRAESTRUTURA = 14,
    MILITAR = 15,
    PRODUCAO_ALIMENTICIA = 16,
    PRODUCAO_CULTURAL_E_DESIGN = 17,
    PRODUCAO_INDUSTRIAL = 18,
    RECURSOS_NATURAIS = 19,
    SEGURANCA = 20,
    TURISMO_HOSPITALIDADE_E_LAZER = 21,
} 

export async function seedAreasConhecimento() {
  const areasConhecimento = [
    { id: AreasConhecimento.CIENCIAS_EXATAS_E_DA_TERRA, name: "Ciências Exatas e da Terra" },
    { id: AreasConhecimento.CIENCIAS_BIOLOGICAS, name: "Ciências Biológicas" },
    { id: AreasConhecimento.ENGENHARIAS_E_TECNOLOGIA, name: "Engenharias e Tecnologia" },
    { id: AreasConhecimento.CIENCIAS_DA_SAUDE, name: "Ciências da Saúde" },
    { id: AreasConhecimento.CIENCIAS_AGRARIAS, name: "Ciências Agrárias" },
    { id: AreasConhecimento.CIENCIAS_SOCIAIS_APLICADAS, name: "Ciências Sociais Aplicadas" },
    { id: AreasConhecimento.CIENCIAS_HUMANAS, name: "Ciências Humanas" },
    { id: AreasConhecimento.LINGUISTICA_LETRAS_E_ARTES, name: "Linguística, Letras e Artes" },
    { id: AreasConhecimento.AMBIENTE_E_SAUDE, name: "Ambiente e Saúde" },
    { id: AreasConhecimento.CONTROLE_E_PROCESSOS_INDUSTRIAIS, name: "Controle e Processos Industriais" },
    { id: AreasConhecimento.DESENVOLVIMENTO_EDUCACIONAL_E_SOCIAL, name: "Desenvolvimento Educacional e Social" },
    { id: AreasConhecimento.GESTAO_E_NEGOCIOS, name: "Gestão e Negócios" },
    { id: AreasConhecimento.INFORMACAO_E_COMUNICACAO, name: "Informação e Comunicação" },
    { id: AreasConhecimento.INFRAESTRUTURA, name: "Infraestrutura" },
    { id: AreasConhecimento.MILITAR, name: "Militar" },
    { id: AreasConhecimento.PRODUCAO_ALIMENTICIA, name: "Produção Alimentícia" },
    { id: AreasConhecimento.PRODUCAO_CULTURAL_E_DESIGN, name: "Produção Cultural e Design" },
    { id: AreasConhecimento.PRODUCAO_INDUSTRIAL, name: "Produção Industrial" },
    { id: AreasConhecimento.RECURSOS_NATURAIS, name: "Recursos Naturais" },
    { id: AreasConhecimento.SEGURANCA, name: "Segurança" },
    { id: AreasConhecimento.TURISMO_HOSPITALIDADE_E_LAZER, name: "Turismo, Hospitalidade e Lazer" },
  ];

  for(const areaConhecimento of areasConhecimento) {
    await prisma.areaConhecimento.upsert({
       where: { id: areaConhecimento.id },
       create: areaConhecimento,
       update: {name: areaConhecimento.name},
     })
  };

  prisma.$disconnect();
  console.log("Areas conhecimento seed inserido com sucesso!");
}