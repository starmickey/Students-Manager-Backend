-- CreateTable
CREATE TABLE "Insignia" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "removeDate" TIMESTAMP(3),

    CONSTRAINT "Insignia_pkey" PRIMARY KEY ("id")
);
