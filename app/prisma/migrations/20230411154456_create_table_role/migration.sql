/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userRoleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_PermissionToUserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PermissionToUserRole" DROP CONSTRAINT "_PermissionToUserRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUserRole" DROP CONSTRAINT "_PermissionToUserRole_B_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_userRoleId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
DROP COLUMN "userRoleId",
ADD COLUMN     "roleId" TEXT;

-- DropTable
DROP TABLE "_PermissionToUserRole";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
