/*
  Warnings:

  - You are about to drop the `user_setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_setting" DROP CONSTRAINT "user_setting_userId_fkey";

-- DropTable
DROP TABLE "user_setting";
