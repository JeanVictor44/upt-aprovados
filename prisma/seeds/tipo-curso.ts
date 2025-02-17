import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export enum TiposCurso {
    BACHARELADO = 1,
    LICENCIATURA = 2,
    TECNOLOGO = 3,
} 

export async function seedTiposCurso() {
  const tiposCurso = [
    { id: TiposCurso.LICENCIATURA, name: "Bacharelado" },
    { id: TiposCurso.BACHARELADO, name: "Licenciatura" },
    { id: TiposCurso.TECNOLOGO, name: "Tecnólogo" },
  ];

  for(const tipoCurso of tiposCurso) {
    await prisma.tipoCurso.upsert({
       where: { id: tipoCurso.id },
       create: tipoCurso,
       update: {name: tipoCurso.name},
     })
  };

  prisma.$disconnect();
  console.log("Tipos cursos seed inserido com sucesso!");
}