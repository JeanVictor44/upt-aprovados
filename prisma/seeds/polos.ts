import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export enum Polos {
  Salvador = 1,
  Alagoinhas = 2,
  Barreiras = 3,
  Bom_Jesus_da_Lapa = 4,
  Brumado = 5,
  Caetite = 6,
  Camacari = 7,
  Canudos = 8,
  Conceicao_do_Coite = 9,
  Euclides_da_Cunha = 10,
  Eunapolis = 11,
  Guanambi = 12,
  Ipiau = 13,
  Irece = 14,
  Itaberaba = 15,
  Jacobina = 16,
  Juazeiro = 17,
  Lauro_de_Freitas = 18,
  Paulo_Afonso = 19,
  Santo_Antonio_de_Jesus = 20,
  Seabra = 21,
  Senhor_do_Bomfim = 22,
  Serrinha = 23,
  Teixeira_de_Freitas = 24,
  Valenca = 25,
  Xique_Xique = 26,
}
export async function seedPolos() {
  const polos = [
    { id: Polos.Salvador, name: "Salvador" },
    { id: Polos.Alagoinhas, name: "Alagoinhas" },
    { id: Polos.Barreiras, name: "Barreiras" },
    { id: Polos.Bom_Jesus_da_Lapa, name: "Bom Jesus da Lapa" },
    { id: Polos.Brumado, name: "Brumado" },
    { id: Polos.Caetite, name: "Caetité" },
    { id: Polos.Camacari, name: "Camaçari" },
    { id: Polos.Canudos, name: "Canudos" },
    { id: Polos.Conceicao_do_Coite, name: "Conceição do Coité" },
    { id: Polos.Euclides_da_Cunha, name: "Euclides da Cunha" },
    { id: Polos.Eunapolis, name: "Eunápolis" },
    { id: Polos.Guanambi, name: "Guanambi" },
    { id: Polos.Ipiau, name: "Ipiaú" },
    { id: Polos.Irece, name: "Irecê" },
    { id: Polos.Itaberaba, name: "Itaberaba" },
    { id: Polos.Jacobina, name: "Jacobina" },
    { id: Polos.Juazeiro, name: "Juazeiro" },
    { id: Polos.Lauro_de_Freitas, name: "Lauro de Freitas" },
    { id: Polos.Paulo_Afonso, name: "Paulo Afonso" },
    { id: Polos.Santo_Antonio_de_Jesus, name: "Santo Antônio de Jesus" },
    { id: Polos.Seabra, name: "Seabra" },
    { id: Polos.Senhor_do_Bomfim, name: "Senhor do Bomfim" },
    { id: Polos.Serrinha, name: "Serrinha" },
    { id: Polos.Teixeira_de_Freitas, name: "Teixeira de Freitas" },
    { id: Polos.Valenca, name: "Valença" },
    { id: Polos.Xique_Xique, name: "Xique-Xique" },
  ];

  for(const polo of polos) {
    await prisma.polo.upsert({
       where: { id: polo.id },
       create: polo,
       update: {name: polo.name},
     })
  };

  prisma.$disconnect();
  console.log("Polos seed inserida com sucesso!");
}