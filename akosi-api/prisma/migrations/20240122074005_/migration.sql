/*
  Warnings:

  - The primary key for the `user_profile_names` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_profile_names` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_user_profile_names_id";

-- AlterTable
ALTER TABLE "user_profile_names" DROP CONSTRAINT "user_profile_names_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "user_profile_names_pkey" PRIMARY KEY ("user_id");

-- CreateIndex
CREATE INDEX "idx_user_profile_names_userid" ON "user_profile_names"("user_id");

-- CreateIndex
CREATE INDEX "idx_users_username" ON "users"("user_name");
