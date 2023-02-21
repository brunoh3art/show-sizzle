/*
  Warnings:

  - You are about to drop the column `episodeId` on the `video` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `video` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "video" DROP CONSTRAINT "video_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "video" DROP CONSTRAINT "video_movieId_fkey";

-- AlterTable
ALTER TABLE "episode" ADD COLUMN     "videoId" TEXT;

-- AlterTable
ALTER TABLE "movie" ADD COLUMN     "videoId" TEXT;

-- AlterTable
ALTER TABLE "video" DROP COLUMN "episodeId",
DROP COLUMN "movieId";

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "episode_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE SET NULL ON UPDATE CASCADE;
