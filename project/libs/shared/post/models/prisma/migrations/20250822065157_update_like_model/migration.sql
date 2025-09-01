/*
  Warnings:

  - You are about to drop the column `author_id` on the `likes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,post_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."likes_author_id_idx";

-- DropIndex
DROP INDEX "public"."likes_author_id_post_id_key";

-- AlterTable
ALTER TABLE "public"."likes" DROP COLUMN "author_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "likes_user_id_idx" ON "public"."likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_post_id_key" ON "public"."likes"("user_id", "post_id");
