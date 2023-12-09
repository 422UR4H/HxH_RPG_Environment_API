/*
  Warnings:

  - You are about to alter the column `nick` on the `characters` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `VarChar(12)`.
  - You are about to alter the column `name` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `nick` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `VarChar(12)`.

*/
-- AlterTable
ALTER TABLE "characters" ALTER COLUMN "nick" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "name" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "nick" SET DATA TYPE VARCHAR(12),
ALTER COLUMN "role" SET DEFAULT 'PLAYER';
