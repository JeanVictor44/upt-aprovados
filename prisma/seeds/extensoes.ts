import { PrismaClient } from "@prisma/client";
import { Polos } from "./polos";

const prisma = new PrismaClient();

export async function seedExtensoes() {
    const extensoes = [

        /* Salvador */
        { id: 1, name: "Remota/Digital (via Google Meet) - Noturno", poloId: Polos.Salvador },
        { id: 2, name: "Remota/Digital (via Google Meet) - Vespertino", poloId: Polos.Salvador },
        { id: 3, name: "Remota/Digital Emitec - Noturno", poloId: Polos.Salvador },
        { id: 4, name: "Remota/Digital Emitec - Vespertino", poloId: Polos.Salvador },
        { id: 5, name: "Remota/Digital Emitec - Matutino", poloId: Polos.Salvador },
        { id: 6, name: "Itinga - Lauro de Freitas (Lot. Santa Júlia)", poloId: Polos.Salvador },
        { id: 7, name: "Vida Nova - Lauro de Freitas", poloId: Polos.Salvador },
        { id: 8, name: "Alto de Coutos (Associação Mãe Rainha)", poloId: Polos.Salvador },
        { id: 9, name: "Rio Sena", poloId: Polos.Salvador },
        { id: 10, name: "Bairro da Paz (Base Comunitária de Segurança do Bairro da Paz)", poloId: Polos.Salvador },
        { id: 11, name: "Nordeste de Amaralina (CEEP - Escola de 2º Grau Carlos Santana II)", poloId: Polos.Salvador },
        { id: 12, name: "Rio Vermelho (Centro de Referência LGBT)", poloId: Polos.Salvador },
        { id: 13, name: "Barbalho (Centro Estadual de Educação Profissional Isaias Alves - ICEIA)", poloId: Polos.Salvador },
        { id: 14, name: "Narandiba (Centro Social de Narandiba)", poloId: Polos.Salvador },
        { id: 15, name: "Pelourinho (CEPAIA- Centro de Estudos dos Povos Afro-Indígenas Americanos/UNEB)", poloId: Polos.Salvador },
        { id: 16, name: "Itapoã (Colégio Estadual Rotary)", poloId: Polos.Salvador },
        { id: 17, name: "Dendezeiros (Colégio Estadual Alípio Franca)", poloId: Polos.Salvador },
        { id: 18, name: "Nazaré/Mouraria (Colégio Estadual Mário Augusto Teixeira de Freitas)", poloId: Polos.Salvador },
        { id: 19, name: "Nazaré (Exclusiva ao Movimento de População de Rua - Projeto Pop Rua) - Colégio Severino Vieira", poloId: Polos.Salvador },
        { id: 20, name: "Nazaré (Colégio Estadual da Bahia Central)", poloId: Polos.Salvador },
        { id: 21, name: "São Rafael (Colégio Estadual David Mendes Pereira)", poloId: Polos.Salvador },
        { id: 22, name: "Fazenda Grande do Retiro (Colégio Estadual Dom Avelar Brandão Vilela)", poloId: Polos.Salvador },
        { id: 23, name: "Cajazeiras X (Colégio Estadual Dona Mora Guimarães)", poloId: Polos.Salvador },
        { id: 24, name: "Cajazeiras IV (Colégio Estadual Edvaldo Brandão Correia)", poloId: Polos.Salvador },
        { id: 25, name: "Brotas (Colégio Estadual Goés Calmon)", poloId: Polos.Salvador },
        { id: 26, name: "Tancredo Neves (Colégio Estadual Helena Magalhães Quilombola)", poloId: Polos.Salvador },
        { id: 27, name: "Periperi (Colégio Estadual Nelson Mandela)", poloId: Polos.Salvador },
        { id: 28, name: "Valéria (Colégio Estadual Noêmia Rego)", poloId: Polos.Salvador },
        { id: 29, name: "São Cristóvão (Colégio Estadual Pedro Paulo Marques e Marques)", poloId: Polos.Salvador },
        { id: 30, name: "Imbuí (Colégio Estadual Professor Rômulo Almeida)", poloId: Polos.Salvador },
        { id: 31, name: "Jardim Cajazeiras (Colégio Estadual Deputado Rogério Rego)", poloId: Polos.Salvador },
        { id: 32, name: "Cabula (UNEB - Departamento Ciências da Vida)", poloId: Polos.Salvador },
        { id: 33, name: "Cabula (UNEB - Departamento de Ciências Exatas e da Terra)", poloId: Polos.Salvador },
        { id: 34, name: "Cabula (UNEB - Departamento de Ciências Humanas)", poloId: Polos.Salvador },
        { id: 35, name: "Cabula (UNEB - Departamento de Educação)", poloId: Polos.Salvador },
        { id: 36, name: "Pelourinho (Escola Olodum)", poloId: Polos.Salvador },
        { id: 37, name: "Ribeira (Escola Estadual Presciliano Silva)", poloId: Polos.Salvador },
        { id: 38, name: "Fazenda Coutos (Escola Municipal Esther Felix de Souza)", poloId: Polos.Salvador },
        { id: 39, name: "Ilha de Maré - Porto dos Cavalos (Associação de Moradores, Pescadores e Marisqueiras)", poloId: Polos.Salvador },
        { id: 40, name: "Ilha de Maré - Praia Grande (Escola Municipal de Ilha de Maré)", poloId: Polos.Salvador },
        { id: 41, name: "São Marcos (Instituto Anísio Teixeira - IAT (UAB))", poloId: Polos.Salvador },
        { id: 42, name: "Pituaçu (Templo e Escola Umbandista Mata Virgem)", poloId: Polos.Salvador },
        { id: 43, name: "São Gonçalo (Terreiro Ilê Axé Opo Afonjá)", poloId: Polos.Salvador },
        { id: 44, name: "Costa Azul (Colégio Estadual Thales de Azevedo)", poloId: Polos.Salvador },
        { id: 45, name: "Periperi - Movimento dos Sem Teto (Residencial Paraguari II) - Px. Hospital do Subúrbio", poloId: Polos.Salvador },
        { id: 46, name: "Paripe (Colégio Estadual Professor Carlos Barros)", poloId: Polos.Salvador },
        { id: 47, name: "Massaranduba (Escola Estadual Ocridalina Madureira)", poloId: Polos.Salvador },
        { id: 48, name: "Calabar (Base Comunitária de Segurança da PM)", poloId: Polos.Salvador },
        { id: 49, name: "Santa Cruz (Base Comunitária de Segurança da PM)", poloId: Polos.Salvador },
        { id: 50, name: "Bonfim – Coletivo As Pretas Falam (Colégio Estadual Paulo Américo de Oliveira)", poloId: Polos.Salvador },

        /* Alagoinhas */
        { id: 51, name: "Centro", poloId: Polos.Alagoinhas },
        { id: 52, name: "Polo EAD UAB", poloId: Polos.Alagoinhas },
        { id: 53, name: "Itanagra", poloId: Polos.Alagoinhas },
        { id: 54, name: "Ouriçangas", poloId: Polos.Alagoinhas },
        { id: 55, name: "Pedrão", poloId: Polos.Alagoinhas },
        { id: 56, name: "Teodoro Sampaio", poloId: Polos.Alagoinhas },
        { id: 57, name: "Terra Nova", poloId: Polos.Alagoinhas },

        /* Barreiras */
        { id: 58, name: "Campus UNEB", poloId: Polos.Barreiras },
        { id: 59, name: "Polo EAD UAB", poloId: Polos.Barreiras },
        { id: 60, name: "Formosa do Rio Preto", poloId: Polos.Barreiras },
        { id: 61, name: "Santa Rita de Cássia", poloId: Polos.Barreiras },

        /* Bom Jesus da Lapa */
        { id: 62, name: "Campus UNEB", poloId: Polos.Bom_Jesus_da_Lapa },
        { id: 63, name: "Ibotirama", poloId: Polos.Bom_Jesus_da_Lapa },

        /*Brumado */
        { id: 64, name: "Aracatu", poloId: Polos.Brumado },
        { id: 65, name: "Boquira", poloId: Polos.Brumado },
        { id: 66, name: "Brumado", poloId: Polos.Brumado },
        { id: 67, name: "Caculé", poloId: Polos.Brumado },
        { id: 68, name: "Dom Basílio", poloId: Polos.Brumado },
        { id: 69, name: "Livramento de Nossa Senhora", poloId: Polos.Brumado },
        { id: 70, name: "Macaúbas", poloId: Polos.Brumado },
        { id: 71, name: "Malhada de Pedras", poloId: Polos.Brumado },
        { id: 72, name: "Paramirim", poloId: Polos.Brumado },
        { id: 73, name: "Rio de Contas", poloId: Polos.Brumado },
        { id: 74, name: "Rio de Contas", poloId: Polos.Brumado },
        { id: 75, name: "Rio do Pires", poloId: Polos.Brumado },
        { id: 76, name: "Tanhaçu", poloId: Polos.Brumado },

        /* Caetité */
        { id: 77, name: "Campus UNEB", poloId: Polos.Caetite },
        { id: 78, name: "Distrito Maniaçú", poloId: Polos.Caetite },
        { id: 79, name: "Ibiassucê", poloId: Polos.Caetite },
        { id: 80, name: "Igaporã", poloId: Polos.Caetite },
        { id: 81, name: "Lagoa Real", poloId: Polos.Caetite },
        { id: 82, name: "Tanque Novo", poloId: Polos.Caetite },

        /* Camaçari */
        { id: 83, name: "Cidade do Saber (UAB)", poloId: Polos.Camacari },
        { id: 84, name: "Alto da Cruz", poloId: Polos.Camacari },
        { id: 85, name: "Bomba", poloId: Polos.Camacari },
        { id: 86, name: "Alto da Cruz", poloId: Polos.Camacari },
        { id: 87, name: "Gleba C", poloId: Polos.Camacari },
        { id: 88, name: "Base Comunitária da Polícia Militar do Phoc 2", poloId: Polos.Camacari },
        { id: 89, name: "Arembepe", poloId: Polos.Camacari },
        { id: 90, name: "Abrantes", poloId: Polos.Camacari },
        { id: 91, name: "Dias D'Ávila", poloId: Polos.Camacari },
        { id: 92, name: "Monte Gordo", poloId: Polos.Camacari },
        { id: 93, name: "Pojuça", poloId: Polos.Camacari },
        { id: 94, name: "São Sebastião do Passé", poloId: Polos.Camacari },
        { id: 95, name: "Simões Filho - Cia e Centro", poloId: Polos.Camacari },
        { id: 96, name: "Simões Filho - Góes Calmon", poloId: Polos.Camacari },
        { id: 97, name: "Simões Filho - Quilombo Pitanga do Palmares", poloId: Polos.Camacari },
        { id: 98, name: "Simões Filho - Parque Continental", poloId: Polos.Camacari },
        { id: 99, name: "Mata de São João", poloId: Polos.Camacari },

        /* Canudos */
        { id: 100, name: "Canudos - Centro", poloId: Polos.Canudos },

        /* Conceição do Coité */
        { id: 101, name: "Campus UNEB", poloId: Polos.Conceicao_do_Coite },
        { id: 102, name: "Polo EAD UAB", poloId: Polos.Conceicao_do_Coite },
        { id: 103, name: "Nova Fátima", poloId: Polos.Conceicao_do_Coite },
        { id: 104, name: "Retirolândia", poloId: Polos.Conceicao_do_Coite },
        { id: 105, name: "Santa Luz", poloId: Polos.Conceicao_do_Coite },
        { id: 106, name: "Santa Luz", poloId: Polos.Conceicao_do_Coite },
        { id: 107, name: "Valente - Centro", poloId: Polos.Conceicao_do_Coite },
        { id: 108, name: "Valente - Sindicato Trabalhadores Rurais", poloId: Polos.Conceicao_do_Coite },

        /* Euclides da cunha */
        { id: 109, name: " Campus UNEB", poloId: Polos.Euclides_da_Cunha },
        { id: 110, name: " Polo EAD UAB", poloId: Polos.Euclides_da_Cunha },
        { id: 111, name: " Monte Santo", poloId: Polos.Euclides_da_Cunha },
        { id: 112, name: " Ribeira do Amparo", poloId: Polos.Euclides_da_Cunha },
        { id: 113, name: " Ribeira do Pombal", poloId: Polos.Euclides_da_Cunha },

        /* Eunápoli */
        { id: 114, name: "Eunápolis", poloId: Polos.Eunapolis },
        { id: 115, name: "Guaratinga", poloId: Polos.Eunapolis },
        { id: 116, name: "Itabela", poloId: Polos.Eunapolis },
        { id: 117, name: "Itagimirim", poloId: Polos.Eunapolis },
        { id: 118, name: "Porto Seguro - Aldeia Indígena Boca da Mata", poloId: Polos.Eunapolis },
        { id: 119, name: "Porto Seguro - Parque Ecológico", poloId: Polos.Eunapolis },
        { id: 120, name: "Porto Seguro - Centro", poloId: Polos.Eunapolis },

        /* Guanambi */
        { id: 121, name: "Carinhanha", poloId: Polos.Guanambi },
        { id: 122, name: "Guanambi - Distrito Mutans", poloId: Polos.Guanambi },
        { id: 123, name: "Guanambi - Campus UNEB", poloId: Polos.Guanambi },
        { id: 124, name: "Iuiu", poloId: Polos.Guanambi },
        { id: 125, name: "Urandi", poloId: Polos.Guanambi },

        /* Ipiaú */
        { id: 126, name: "Ibirapitanga", poloId: Polos.Ipiau },
        { id: 127, name: "Ipiaú", poloId: Polos.Ipiau },

        /* Irecê */
        { id: 128, name: "América Dourada", poloId: Polos.Irece },
        { id: 129, name: "Barra do Mendes", poloId: Polos.Irece },
        { id: 130, name: "Canarana", poloId: Polos.Irece },
        { id: 131, name: "Canarana", poloId: Polos.Irece },
        { id: 132, name: "Ibipeba", poloId: Polos.Irece },
        { id: 133, name: "Ibititá", poloId: Polos.Irece },
        { id: 134, name: "Irecê", poloId: Polos.Irece },
        { id: 135, name: "Ibipeba", poloId: Polos.Irece },
        { id: 136, name: "Presidente Dutra", poloId: Polos.Irece },
        { id: 137, name: "São Gabriel", poloId: Polos.Irece },
        { id: 138, name: "Jussara", poloId: Polos.Irece },
        { id: 139, name: "João Dourado", poloId: Polos.Irece },
        { id: 140, name: "Morro do Chapéu", poloId: Polos.Irece },

        /* Itaberaba */
        { id: 150, name: "Boa Vista do Tupim", poloId: Polos.Itaberaba },
        { id: 151, name: "Iaçu", poloId: Polos.Itaberaba },
        { id: 152, name: "Ipirá", poloId: Polos.Itaberaba },
        { id: 153, name: "São João", poloId: Polos.Itaberaba },
        { id: 154, name: "Centro - Polo EAD UAB", poloId: Polos.Itaberaba },
        { id: 155, name: "Marcionílio Souza", poloId: Polos.Itaberaba },
        { id: 156, name: "Rui Barbosa", poloId: Polos.Itaberaba },
        { id: 157, name: "Lajedinho", poloId: Polos.Itaberaba },
        
        /* Jacobina */
        { id: 158, name: "Baixa Grande", poloId: Polos.Jacobina },
        { id: 159, name: "Caém", poloId: Polos.Jacobina },
        { id: 160, name: "Caldeirão Grande", poloId: Polos.Jacobina },
        { id: 161, name: "Capim Grosso", poloId: Polos.Jacobina },
        { id: 162, name: "Gavião", poloId: Polos.Jacobina },
        { id: 163, name: "Centro", poloId: Polos.Jacobina },
        { id: 164, name: "Nazaré", poloId: Polos.Jacobina },
        { id: 165, name: "Novo Paraíso", poloId: Polos.Jacobina },
        { id: 166, name: "Bananeira", poloId: Polos.Jacobina },
        { id: 167, name: "Distrito Junco", poloId: Polos.Jacobina },
        { id: 168, name: "Miguel Calmon", poloId: Polos.Jacobina },
        { id: 169, name: "Mundo Novo", poloId: Polos.Jacobina },
        { id: 170, name: "Piritiba", poloId: Polos.Jacobina },
        { id: 171, name: "Quixabeira", poloId: Polos.Jacobina },
        { id: 172, name: "Saúde", poloId: Polos.Jacobina },
        { id: 173, name: "Serrolândia", poloId: Polos.Jacobina },
        { id: 174, name: "Várzea do Poço", poloId: Polos.Jacobina },
        { id: 175, name: "Várzea Nova", poloId: Polos.Jacobina },
        
        /* Juazeiro */
        { id: 176, name: "Campo Alegre de Lourdes", poloId: Polos.Juazeiro },
        { id: 177, name: "Salitre (Quilombo Rodeadouro)", poloId: Polos.Juazeiro },
        { id: 178, name: "Sede", poloId: Polos.Juazeiro },
        { id: 179, name: "Remanso", poloId: Polos.Juazeiro },
        { id: 180, name: "Sento Sé", poloId: Polos.Juazeiro },
        
        /* Lauro de Freitas */
        { id: 181, name: "Campus UNEB", poloId: Polos.Lauro_de_Freitas },
        
        /* Paulo Afonso */
        { id: 182, name: "Glória", poloId: Polos.Paulo_Afonso },
        { id: 183, name: "Jeremoabo", poloId: Polos.Paulo_Afonso },
        { id: 184, name: "Campus UNEB", poloId: Polos.Paulo_Afonso },
        { id: 185, name: "Polo EAD UAB", poloId: Polos.Paulo_Afonso },
        { id: 186, name: "Tancredo Neves I", poloId: Polos.Paulo_Afonso },
        { id: 187, name: "Pedro Alexandre", poloId: Polos.Paulo_Afonso },
        { id: 188, name: "Santa Brígida", poloId: Polos.Paulo_Afonso },
        
        /*Santo Antônio de Jesus */
        { id: 189, name: "Castro Alves", poloId: Polos.Santo_Antonio_de_Jesus },
        { id: 190, name: "Dom Macedo Costa", poloId: Polos.Santo_Antonio_de_Jesus },
        { id: 191, name: "Jaguaripe", poloId: Polos.Santo_Antonio_de_Jesus },
        { id: 192, name: "Laje", poloId: Polos.Santo_Antonio_de_Jesus },
        { id: 193, name: "Muniz Ferreira", poloId: Polos.Santo_Antonio_de_Jesus },
        { id: 194, name: "São Miguel das Matas", poloId: Polos.Santo_Antonio_de_Jesus },
        { id: 195, name: "Varzedo", poloId: Polos.Santo_Antonio_de_Jesus },
        { id: 196, name: "Aratuípe", poloId: Polos.Santo_Antonio_de_Jesus },
        { id: 197, name: "Nazaré das Farinhas", poloId: Polos.Santo_Antonio_de_Jesus },
        { id: 198, name: "Santo Antônio de Jesus", poloId: Polos.Santo_Antonio_de_Jesus },

        /* Seabra */
        { id: 199, name: "Barra da Estiva", poloId: Polos.Seabra },
        { id: 200, name: "Boninal", poloId: Polos.Seabra },
        { id: 201, name: "Iraquara", poloId: Polos.Seabra },
        { id: 202, name: "Mulungu do Morro", poloId: Polos.Seabra },
        { id: 203, name: "Palmeiras", poloId: Polos.Seabra },
        { id: 204, name: "Seabra - Sede", poloId: Polos.Seabra },
        { id: 205, name: "Seabra - Vão das Palmeiras - Com. Quilombola", poloId: Polos.Seabra },
        { id: 206, name: "Souto Soares", poloId: Polos.Seabra },
        { id: 207, name: "Wagner", poloId: Polos.Seabra },
        
        /* Senhor do Bonfim */
        { id: 208, name: "Abndorinha", poloId: Polos.Senhor_do_Bomfim },
        { id: 209, name: "Antonio Gonçalves", poloId: Polos.Senhor_do_Bomfim },
        { id: 210, name: "Campo Formoso - Comunidade Quilombola São Tomé", poloId: Polos.Senhor_do_Bomfim },
        { id: 211, name: "Campo Formoso - Centro", poloId: Polos.Senhor_do_Bomfim },
        { id: 212, name: "Campo Formoso - Lage dos Negros", poloId: Polos.Senhor_do_Bomfim },
        { id: 213, name: "Filadélfia", poloId: Polos.Senhor_do_Bomfim },
        { id: 214, name: "Distrito de Igara", poloId: Polos.Senhor_do_Bomfim },
        { id: 215, name: "Itiúba", poloId: Polos.Senhor_do_Bomfim },
        { id: 216, name: "Jaguarari", poloId: Polos.Senhor_do_Bomfim },
        { id: 217, name: "Ponto Novo", poloId: Polos.Senhor_do_Bomfim },
        { id: 218, name: "Gamboa", poloId: Polos.Senhor_do_Bomfim },
        { id: 219, name: "Centro", poloId: Polos.Senhor_do_Bomfim },
        { id: 220, name: "Distrito de Tijuçu - Com. Quilombola", poloId: Polos.Senhor_do_Bomfim },
        { id: 221, name: "Missão do Sahy", poloId: Polos.Senhor_do_Bomfim },
        { id: 222, name: "Alto da Maravilha", poloId: Polos.Senhor_do_Bomfim },

        /* Serrinha */
        { id: 223, name: "Água Fria", poloId: Polos.Serrinha },
        { id: 224, name: "Araci", poloId: Polos.Serrinha },
        { id: 225, name: "Barrocas", poloId: Polos.Serrinha },
        { id: 226, name: "Biritinga", poloId: Polos.Serrinha },
        { id: 227, name: "Cipó", poloId: Polos.Serrinha },
        { id: 228, name: "Lamarão", poloId: Polos.Serrinha },
        { id: 229, name: "Serra Preta", poloId: Polos.Serrinha },
        { id: 230, name: "Campus UNEB", poloId: Polos.Serrinha },
        { id: 231, name: "Bela Vista", poloId: Polos.Serrinha },
        { id: 232, name: "Centro (Polo EAD - UAB)", poloId: Polos.Serrinha },
        { id: 233, name: "Teofilândia", poloId: Polos.Serrinha },
       
        /* Teixeira de Freitas */
        { id: 234, name: "Teixeira de Freitas", poloId: Polos.Teixeira_de_Freitas },
        
        /* Valença */
        { id: 235, name: "Camamu", poloId: Polos.Valenca },
        { id: 236, name: "Igrapiúna", poloId: Polos.Valenca },
        { id: 237, name: "Itaparica - Bom Despacho", poloId: Polos.Valenca },
        { id: 238, name: "Itaparica - Brasileirinho", poloId: Polos.Valenca },
        { id: 239, name: "Ituberá - Centro", poloId: Polos.Valenca },
        { id: 240, name: "Ituberá - Assentamento MST Josiney Hipópito", poloId: Polos.Valenca },
        { id: 241, name: "Jiquiriçá", poloId: Polos.Valenca },
        { id: 242, name: "Mutuípe", poloId: Polos.Valenca },
        { id: 243, name: "Salinas das Margaridas", poloId: Polos.Valenca },
        { id: 244, name: "Santo Amaro", poloId: Polos.Valenca },
        { id: 245, name: "Taperoá", poloId: Polos.Valenca },
        { id: 246, name: "Graça", poloId: Polos.Valenca },
        { id: 247, name: "Bolívia", poloId: Polos.Valenca },
        { id: 248, name: "Distrito Orobó (Quilombola)", poloId: Polos.Valenca },
        { id: 249, name: "Vera Cruz - Mar Grande", poloId: Polos.Valenca },
        { id: 250, name: "Vera Cruz - Tairu/Barra do Gil", poloId: Polos.Valenca },
        { id: 251, name: "Vera Cruz - Cacha Pregos", poloId: Polos.Valenca },

        /* Xique-Xique */
        { id: 252, name: "Gentio do Ouro", poloId: Polos.Xique_Xique },
        { id: 253, name: "Itaguaçu", poloId: Polos.Xique_Xique },
        { id: 254, name: "Xique-Xique", poloId: Polos.Xique_Xique },
    ];

    for (const extensao of extensoes) {
        await prisma.extensao.upsert({
            where: { id: extensao.id, poloId: extensao.poloId },
            create: extensao,
            update: { name: extensao.name },
        })
    };

    prisma.$disconnect();
    console.log("Extensões seed inserida com sucesso!");
}