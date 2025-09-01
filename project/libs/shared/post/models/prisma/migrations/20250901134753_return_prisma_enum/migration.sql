/*
  Warnings:

  - Changed the type of `type` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PostType" AS ENUM ('video', 'text', 'quote', 'link', 'photo');

-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "type",
ADD COLUMN     "type" "public"."PostType" NOT NULL;
