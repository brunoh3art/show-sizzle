/*
  Warnings:

  - You are about to drop the column `movieId` on the `genre` table. All the data in the column will be lost.
  - You are about to drop the column `tvShowId` on the `genre` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "genre" DROP CONSTRAINT "genre_movieId_fkey";

-- DropForeignKey
ALTER TABLE "genre" DROP CONSTRAINT "genre_tvShowId_fkey";

-- AlterTable
ALTER TABLE "genre" DROP COLUMN "movieId",
DROP COLUMN "tvShowId",
ADD COLUMN     "movieid" TEXT,
ADD COLUMN     "tvshowid" TEXT;

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_tvshowid_fkey" FOREIGN KEY ("tvshowid") REFERENCES "tvshow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_movieid_fkey" FOREIGN KEY ("movieid") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
