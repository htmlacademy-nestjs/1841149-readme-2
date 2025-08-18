/*
  Warnings:

  - You are about to drop the column `text` on the `quote_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."quote_posts" DROP COLUMN "text";

-- CreateTable
CREATE TABLE "public"."link_posts" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "quote_author" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "link_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "link_posts_post_id_key" ON "public"."link_posts"("post_id");

-- AddForeignKey
ALTER TABLE "public"."link_posts" ADD CONSTRAINT "link_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
