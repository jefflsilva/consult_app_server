/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `role` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "role" "UserRole" NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role";
