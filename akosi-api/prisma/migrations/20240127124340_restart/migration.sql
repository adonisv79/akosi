-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile_names" (
    "user_id" UUID NOT NULL,
    "given_name" VARCHAR(255) NOT NULL,
    "middle_name" VARCHAR(255),
    "surname" VARCHAR(255),
    "patronymic_name" VARCHAR(255),
    "honorific_title" VARCHAR(255),
    "name_suffix" VARCHAR(255),
    "created_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profile_names_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_activity_logs" (
    "user_id" UUID NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_activity_logs_pkey" PRIMARY KEY ("user_id","created_date")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE INDEX "idx_users_id" ON "users"("id");

-- CreateIndex
CREATE INDEX "idx_users_username" ON "users"("user_name");

-- CreateIndex
CREATE INDEX "idx_user_profile_names_userid" ON "user_profile_names"("user_id");

-- AddForeignKey
ALTER TABLE "user_profile_names" ADD CONSTRAINT "user_profile_names_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_activity_logs" ADD CONSTRAINT "user_activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
