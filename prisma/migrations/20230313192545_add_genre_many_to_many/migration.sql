-- DropForeignKey
ALTER TABLE "genre" DROP CONSTRAINT "genre_tvshowid_fkey";

-- CreateTable
CREATE TABLE "_GenreToTvShow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToTvShow_AB_unique" ON "_GenreToTvShow"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToTvShow_B_index" ON "_GenreToTvShow"("B");

-- AddForeignKey
ALTER TABLE "_GenreToTvShow" ADD CONSTRAINT "_GenreToTvShow_A_fkey" FOREIGN KEY ("A") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToTvShow" ADD CONSTRAINT "_GenreToTvShow_B_fkey" FOREIGN KEY ("B") REFERENCES "tvshow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
