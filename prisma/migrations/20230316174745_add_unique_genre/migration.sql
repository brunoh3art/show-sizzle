/*
  Warnings:

  - A unique constraint covering the columns `[id,title]` on the table `genre` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "genre_id_title_key" ON "genre"("id", "title");
