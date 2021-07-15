-- AlterTable
ALTER TABLE `Note` ADD COLUMN `bookmarked` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `content` VARCHAR(191);
