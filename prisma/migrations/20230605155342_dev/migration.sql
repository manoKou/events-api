/*
  Warnings:

  - The values [DELETED] on the enum `Update_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[id,belongsToId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Update` MODIFY `status` ENUM('IN_PROGRESS', 'CANCELED', 'DEPRECATED') NOT NULL DEFAULT 'IN_PROGRESS';

-- CreateIndex
CREATE UNIQUE INDEX `Event_id_belongsToId_key` ON `Event`(`id`, `belongsToId`);
