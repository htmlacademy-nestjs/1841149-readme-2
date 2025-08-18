/*
  Warnings:

  - You are about to drop the column `like_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `orginial_post_id` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "like_id",
DROP COLUMN "orginial_post_id",
ADD COLUMN     "original_author_id" TEXT,
ADD COLUMN     "originial_post_id" TEXT,
ALTER COLUMN "repost_created_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."likes" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "likes_author_id_idx" ON "public"."likes"("author_id");

-- AddForeignKey
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
