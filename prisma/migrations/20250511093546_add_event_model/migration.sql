-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_username` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `startDate` DATETIME(6) NOT NULL,
    `endDate` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_user_username_fkey` FOREIGN KEY (`user_username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
