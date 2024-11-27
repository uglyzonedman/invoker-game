-- AlterTable
ALTER TABLE "result_game" ALTER COLUMN "result" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "history_game" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "result_id" INTEGER NOT NULL,

    CONSTRAINT "history_game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "history_game" ADD CONSTRAINT "history_game_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_game" ADD CONSTRAINT "history_game_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "result_game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
