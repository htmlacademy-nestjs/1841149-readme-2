/*
  Warnings:

  - Added the required column `updated_at` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."likes" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."tags" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
