/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Post";

-- CreateTable
CREATE TABLE "public"."posts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "author_id" TEXT NOT NULL,
    "tags" TEXT[],
    "status" TEXT NOT NULL,
    "repost" BOOLEAN NOT NULL,
    "type_id" TEXT NOT NULL,
    "like_id" TEXT NOT NULL,
    "orginial_post_id" TEXT NOT NULL,
    "repost_created_at" TIMESTAMP(3) NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
