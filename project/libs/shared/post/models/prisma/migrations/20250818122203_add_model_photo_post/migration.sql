-- CreateTable
CREATE TABLE "public"."photo_posts" (
    "id" TEXT NOT NULL,
    "photo_link" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "photo_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "photo_posts_post_id_key" ON "public"."photo_posts"("post_id");

-- AddForeignKey
ALTER TABLE "public"."photo_posts" ADD CONSTRAINT "photo_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
