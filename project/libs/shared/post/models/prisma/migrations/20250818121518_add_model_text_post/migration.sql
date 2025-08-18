-- CreateTable
CREATE TABLE "public"."text_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "announce" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "text_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "text_posts_post_id_key" ON "public"."text_posts"("post_id");

-- AddForeignKey
ALTER TABLE "public"."text_posts" ADD CONSTRAINT "text_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
