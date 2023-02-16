-- CreateIndex
CREATE INDEX "episode_id_createdAt_idx" ON "episode"("id", "createdAt");

-- CreateIndex
CREATE INDEX "genre_id_createdAt_idx" ON "genre"("id", "createdAt");

-- CreateIndex
CREATE INDEX "movie_id_createdAt_idx" ON "movie"("id", "createdAt");

-- CreateIndex
CREATE INDEX "season_id_createdAt_idx" ON "season"("id", "createdAt");

-- CreateIndex
CREATE INDEX "tvshow_id_createdAt_idx" ON "tvshow"("id", "createdAt");

-- CreateIndex
CREATE INDEX "video_id_createdAt_idx" ON "video"("id", "createdAt");
