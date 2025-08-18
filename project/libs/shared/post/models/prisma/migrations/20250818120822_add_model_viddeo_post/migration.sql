/*
  Warnings:

  - You are about to drop the column `type_id` on the `posts` table. All the data in the column will be lost.
  - The `status` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[author_id,post_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PostStatus" AS ENUM ('PUBLISHED', 'DRAFT');

-- CreateEnum
CREATE TYPE "public"."PostType" AS ENUM ('VIDEO', 'TEXT', 'QUOTE', 'PHOTO', 'LINK');

-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "type_id",
ADD COLUMN     "type" "public"."PostType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."PostStatus" NOT NULL DEFAULT 'PUBLISHED';

-- CreateTable
CREATE TABLE "public"."video_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "video_link" TEXT NOT NULL,

    CONSTRAINT "video_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_author_id_post_id_key" ON "public"."likes"("author_id", "post_id");
