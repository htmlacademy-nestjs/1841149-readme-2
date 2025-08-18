/*
  Warnings:

  - You are about to drop the column `quote_author` on the `link_posts` table. All the data in the column will be lost.
  - You are about to drop the column `originial_post_id` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."link_posts" DROP COLUMN "quote_author",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "originial_post_id",
ADD COLUMN     "original_post_id" TEXT;
