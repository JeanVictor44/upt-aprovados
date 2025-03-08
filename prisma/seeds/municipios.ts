import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedMunicipios() {
  const municipios = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
  .then(response => response.json())
  .then(data => (data as {nome: string, id: number}[]).map((municipio) => ({nome: municipio.nome, id: municipio.id})));

    for(const municipio of municipios) {
        await prisma.municipio.upsert({
         where: { id: municipio.id, name: municipio.nome },
         create: { name: municipio.nome, id: municipio.id },
         update: { name: municipio.nome, id: municipio.id },
         })
    };

  prisma.$disconnect();
  console.log("Municipios seed inserido com sucesso!");
}