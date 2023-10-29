-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "activationCode" TEXT,
ADD COLUMN   "isActivated" BOOLEAN NOT NULL DEFAULT true;

CREATE UNIQUE INDEX "Customer_activation_code_key" ON "Customer"("activationCode");