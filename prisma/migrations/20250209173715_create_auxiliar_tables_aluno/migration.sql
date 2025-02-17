-- CreateTable
CREATE TABLE "extensao" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "polo_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "extensao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area_conhecimento" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "area_conhecimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_curso" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tipo_curso_id" INTEGER NOT NULL,
    "area_conhecimento_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extensao" ADD CONSTRAINT "extensao_polo_id_fkey" FOREIGN KEY ("polo_id") REFERENCES "polo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "curso_tipo_curso_id_fkey" FOREIGN KEY ("tipo_curso_id") REFERENCES "tipo_curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "curso_area_conhecimento_id_fkey" FOREIGN KEY ("area_conhecimento_id") REFERENCES "area_conhecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
