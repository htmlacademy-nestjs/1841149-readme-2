/*
  Warnings:

  - The values [PUBLISHED,DRAFT] on the enum `PostStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [VIDEO,TEXT,QUOTE,PHOTO,LINK] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PostStatus_new" AS ENUM ('published', 'draft');
ALTER TABLE "public"."posts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."posts" ALTER COLUMN "status" TYPE "public"."PostStatus_new" USING ("status"::text::"public"."PostStatus_new");
ALTER TYPE "public"."PostStatus" RENAME TO "PostStatus_old";
ALTER TYPE "public"."PostStatus_new" RENAME TO "PostStatus";
DROP TYPE "public"."PostStatus_old";
ALTER TABLE "public"."posts" ALTER COLUMN "status" SET DEFAULT 'published';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."PostType_new" AS ENUM ('video', 'text', 'quote', 'photo', 'link');
ALTER TABLE "public"."posts" ALTER COLUMN "type" TYPE "public"."PostType_new" USING ("type"::text::"public"."PostType_new");
ALTER TYPE "public"."PostType" RENAME TO "PostType_old";
ALTER TYPE "public"."PostType_new" RENAME TO "PostType";
DROP TYPE "public"."PostType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."posts" ALTER COLUMN "status" SET DEFAULT 'published';
