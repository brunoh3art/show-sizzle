/*
  Warnings:

  - You are about to drop the column `tvshowId` on the `season` table. All the data in the column will be lost.
  - You are about to drop the `_GenreToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToTvShow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tvshow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToTvShow" DROP CONSTRAINT "_GenreToTvShow_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToTvShow" DROP CONSTRAINT "_GenreToTvShow_B_fkey";

-- DropForeignKey
ALTER TABLE "movie" DROP CONSTRAINT "movie_videoId_fkey";

-- DropForeignKey
ALTER TABLE "season" DROP CONSTRAINT "season_tvshowId_fkey";

-- DropIndex
DROP INDEX "season_id_createdAt_idx";

-- AlterTable
ALTER TABLE "genre" ADD COLUMN     "contentId" TEXT;

-- AlterTable
ALTER TABLE "season" DROP COLUMN "tvshowId",
ADD COLUMN     "contentId" TEXT;

-- DropTable
DROP TABLE "_GenreToMovie";

-- DropTable
DROP TABLE "_GenreToTvShow";

-- DropTable
DROP TABLE "movie";

-- DropTable
DROP TABLE "tvshow";

-- CreateTable
CREATE TABLE "content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT,
    "release_date" TEXT NOT NULL,
    "poster_image" TEXT,
    "background_image" TEXT,
    "published" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "videoId" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "content_id_title_idx" ON "content"("id", "title");

-- CreateIndex
CREATE INDEX "season_id_idx" ON "season"("id");

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season" ADD CONSTRAINT "season_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE SET NULL ON UPDATE CASCADE;
