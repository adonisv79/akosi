/*
  Warnings:

  - You are about to drop the `UserActivityLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserActivityLog" DROP CONSTRAINT "UserActivityLog_user_id_fkey";

-- DropTable
DROP TABLE "UserActivityLog";

-- CreateTable
CREATE TABLE "user_activity_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_activity_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_activity_logs" ADD CONSTRAINT "user_activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
