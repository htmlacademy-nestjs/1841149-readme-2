-- CreateTable
CREATE TABLE "public"."Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "tags" TEXT[],
    "status" TEXT NOT NULL,
    "repost" BOOLEAN NOT NULL,
    "typeId" TEXT NOT NULL,
    "likeId" TEXT NOT NULL,
    "orginalPostId" TEXT NOT NULL,
    "repostCreatedAt" TEXT NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
