-- CreateTable
CREATE TABLE "public"."quote_posts" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "quote_author" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "quote_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quote_posts_post_id_key" ON "public"."quote_posts"("post_id");

-- AddForeignKey
ALTER TABLE "public"."quote_posts" ADD CONSTRAINT "quote_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
