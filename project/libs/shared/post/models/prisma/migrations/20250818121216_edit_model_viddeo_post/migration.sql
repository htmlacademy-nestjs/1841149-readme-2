/*
  Warnings:

  - You are about to drop the column `updated_at` on the `tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[post_id]` on the table `video_posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `post_id` to the `video_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tags" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "public"."video_posts" ADD COLUMN     "post_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "video_posts_post_id_key" ON "public"."video_posts"("post_id");

-- AddForeignKey
ALTER TABLE "public"."video_posts" ADD CONSTRAINT "video_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
