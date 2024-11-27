/*
  Warnings:

  - You are about to drop the column `result_id` on the `history_game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "history_game" DROP CONSTRAINT "history_game_result_id_fkey";

-- AlterTable
ALTER TABLE "history_game" DROP COLUMN "result_id",
ADD COLUMN     "result" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "vac_ban" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "warning" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "warning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "warning" ADD CONSTRAINT "warning_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
