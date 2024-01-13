-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile_names" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "given_name" VARCHAR(255) NOT NULL,
    "middle_name" VARCHAR(255),
    "surname" VARCHAR(255),
    "patronymic_name" VARCHAR(255),
    "honorific_title" VARCHAR(255),
    "name_suffix" VARCHAR(255),

    CONSTRAINT "user_profile_names_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE INDEX "idx_users_id" ON "users"("id");

-- CreateIndex
CREATE INDEX "idx_users_username" ON "users"("id");

-- CreateIndex
CREATE INDEX "idx_user_profile_names_id" ON "user_profile_names"("id");

-- AddForeignKey
ALTER TABLE "user_profile_names" ADD CONSTRAINT "user_profile_names_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
