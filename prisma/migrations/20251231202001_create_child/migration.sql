/*
  Warnings:

  - You are about to drop the `Insignia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Insignia";

-- CreateTable
CREATE TABLE "Pin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "removeDate" TIMESTAMP(3),

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Child" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "birthDay" TIMESTAMP(3),
    "dni" TEXT,
    "address" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removeDate" TIMESTAMP(3),

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);
