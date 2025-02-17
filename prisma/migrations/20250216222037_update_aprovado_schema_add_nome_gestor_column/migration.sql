/*
  Warnings:

  - Added the required column `nome_gestor` to the `aprovado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aprovado" ADD COLUMN     "nome_gestor" TEXT NOT NULL;
