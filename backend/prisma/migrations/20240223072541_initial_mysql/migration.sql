-- CreateTable
CREATE TABLE `emails` (
    `id` CHAR(36) NOT NULL,
    `address` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `emails_address_key`(`address`),
    INDEX `idx_email_id`(`id`),
    INDEX `idx_emails_address`(`address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `email_activity_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email_id` CHAR(36) NOT NULL,
    `activity_id` SMALLINT NOT NULL,
    `data` JSON NULL,
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX `idx_emailactivitylogs_emailid`(`email_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(36) NOT NULL,
    `user_name` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE INDEX `users_user_name_key`(`user_name`),
    INDEX `idx_users_id`(`id`),
    INDEX `idx_users_username`(`user_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_emails` (
    `user_id` CHAR(36) NOT NULL,
    `email_id` CHAR(36) NOT NULL,
    `verified_date` DATETIME(3) NULL,
    `vcode` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`user_id`, `email_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_activity_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(36) NOT NULL,
    `activity_id` SMALLINT NOT NULL,
    `data` JSON NULL,
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX `idx_useractivitylogs_userid`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_profiles` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `is_primary` BIT(1) NOT NULL,
    `given_name` VARCHAR(255) NOT NULL,
    `middle_name` VARCHAR(255) NULL,
    `surname` VARCHAR(255) NULL,
    `patronymic_name` VARCHAR(255) NULL,
    `honorific_title` VARCHAR(255) NULL,
    `name_suffix` VARCHAR(255) NULL,
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `primary_email_id` CHAR(36) NULL,

    UNIQUE INDEX `user_profiles_primary_email_id_key`(`primary_email_id`),
    INDEX `idx_userprofiles_userid`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `email_activity_logs` ADD CONSTRAINT `email_activity_logs_email_id_fkey` FOREIGN KEY (`email_id`) REFERENCES `emails`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_emails` ADD CONSTRAINT `user_emails_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_emails` ADD CONSTRAINT `user_emails_email_id_fkey` FOREIGN KEY (`email_id`) REFERENCES `emails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_activity_logs` ADD CONSTRAINT `user_activity_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_user_id_primary_email_id_fkey` FOREIGN KEY (`user_id`, `primary_email_id`) REFERENCES `user_emails`(`user_id`, `email_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
