import { PrismaClient } from "@prisma/client";
import { seedPolos } from "./seeds/polos";
import { seedCursos } from "./seeds/cursos";
import { seedAreasConhecimento } from "./seeds/areas-conhecimento";
import { seedTiposCurso } from "./seeds/tipo-curso";
import { seedExtensoes } from "./seeds/extensoes";
import { seedTiposSelecao } from "./seeds/tipos-selecao";
import { seedUniversidadesBrasileiras } from "./seeds/universidades-brasileiras";

const prisma = new PrismaClient();

async function main() {
  console.log("Rodando seeds...");

  await seedPolos();
  await seedExtensoes();
  await seedAreasConhecimento();
  await seedTiposCurso();
  await seedTiposSelecao();
  await seedCursos();
  await seedUniversidadesBrasileiras();  
  
  console.log("Seeds concluídas!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });