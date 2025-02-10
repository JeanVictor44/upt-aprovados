-- CreateTable
CREATE TABLE "aprovado" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "year" TEXT,
    "placing" INTEGER,
    "institution_name" TEXT NOT NULL,
    "institution_location" TEXT NOT NULL,
    "extensao_id" INTEGER NOT NULL,
    "curso_id" INTEGER NOT NULL,
    "tipo_selecao_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aprovado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aprovado" ADD CONSTRAINT "aprovado_extensao_id_fkey" FOREIGN KEY ("extensao_id") REFERENCES "extensao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovado" ADD CONSTRAINT "aprovado_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovado" ADD CONSTRAINT "aprovado_tipo_selecao_id_fkey" FOREIGN KEY ("tipo_selecao_id") REFERENCES "tipo_selecao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
