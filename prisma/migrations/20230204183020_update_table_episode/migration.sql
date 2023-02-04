-- AlterTable
ALTER TABLE "episode" ADD COLUMN     "background_image" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "release_date" DROP NOT NULL;
