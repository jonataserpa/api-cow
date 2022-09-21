-- CreateTable
CREATE TABLE `receipts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `companyId` INTEGER NOT NULL,
    `value` VARCHAR(191) NULL,
    `observacion` VARCHAR(191) NULL,
    `status` ENUM('PAYABLE', 'PAIDOUT', 'RECEIVABLE', 'RECEIVED') NOT NULL DEFAULT 'RECEIVABLE',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    INDEX `receipts_description_idx`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
