CREATE TABLE IF NOT EXISTS `user`(
    `id` CHAR(36) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `deleted_at` DATETIME NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `api_keys`(
    `id` VARCHAR(255) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL DEFAULT 'user',
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    `deleted_at` DATETIME NULL,
    PRIMARY KEY(`id`)
);

ALTER TABLE `api_keys` ADD UNIQUE `api_keys_key_unique`(`key`);

ALTER TABLE `api_keys` ADD INDEX `api_keys_deleted_at_index`(`deleted_at`);

CREATE TABLE IF NOT EXISTS `usage`(
    `id` CHAR(36) NOT NULL,
    `model_name` VARCHAR(255) NOT NULL,
    `token_count` BIGINT NOT NULL,
    `model_provider` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `user_id` CHAR(36) NOT NULL,
    `api_key` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

ALTER TABLE `usage` ADD INDEX `usage_model_name_index`(`model_name`);

ALTER TABLE `usage` ADD INDEX `usage_model_provider_index`(`model_provider`);

