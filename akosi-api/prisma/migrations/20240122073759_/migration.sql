/*
  Warnings:

  - The primary key for the `user_activity_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_activity_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_activity_logs" DROP CONSTRAINT "user_activity_logs_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "user_activity_logs_pkey" PRIMARY KEY ("user_id", "created_date");
