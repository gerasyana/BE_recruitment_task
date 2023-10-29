/*
  Warnings:

  - Added the required column `roleId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" "RoleType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- INSERT
INSERT INTO "Role" (id, name, "updatedAt", "createdAt") 
VALUES (1, 'admin', NOW(),NOW()),
       (2, 'user', NOW(),NOW());

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN  "roleId" TEXT;

UPDATE "Customer"
SET "roleId" = 2
WHERE "Customer"."roleId" is null;

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN  "roleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");
