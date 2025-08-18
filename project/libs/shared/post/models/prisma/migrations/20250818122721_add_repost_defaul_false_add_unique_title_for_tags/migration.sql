/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."posts" ALTER COLUMN "repost" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "tags_title_key" ON "public"."tags"("title");
