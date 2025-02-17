/*
  Warnings:

  - You are about to drop the column `institution_location` on the `aprovado` table. All the data in the column will be lost.
  - You are about to drop the column `institution_name` on the `aprovado` table. All the data in the column will be lost.
  - Added the required column `institution_id` to the `aprovado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aprovado" DROP COLUMN "institution_location",
DROP COLUMN "institution_name",
ADD COLUMN     "institution_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "instituicao" (
    "id" SERIAL NOT NULL,
    "codigo_ies" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "codigo_municipio_ibge" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instituicao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aprovado" ADD CONSTRAINT "aprovado_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
