/*
  Warnings:

  - Added the required column `polo_id` to the `aprovado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aprovado" ADD COLUMN     "polo_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "aprovado" ADD CONSTRAINT "aprovado_polo_id_fkey" FOREIGN KEY ("polo_id") REFERENCES "polo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
