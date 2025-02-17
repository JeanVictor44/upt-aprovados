import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export enum TipoSelecao {
    SISU = 1,
    PROUNI = 2,
    VESTIBULAR = 3,
} 

export async function seedTiposSelecao() {
  const tiposSelecao = [
    { id: TipoSelecao.SISU, name: "SISU" },
    { id: TipoSelecao.PROUNI, name: "PROUNI" },
    { id: TipoSelecao.VESTIBULAR, name: "Vestibular" },
  ];

  for(const tipoSelecao of tiposSelecao) {
    await prisma.tipoSelecao.upsert({
       where: { id: tipoSelecao.id },
       create: tipoSelecao,
       update: {name: tipoSelecao.name},
     })
  };

  prisma.$disconnect();
  console.log("Tipos cursos seed inserido com sucesso!");
}