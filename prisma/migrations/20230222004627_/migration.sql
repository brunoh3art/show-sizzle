-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT,
    "release_date" TEXT NOT NULL,
    "poster_image" TEXT,
    "background_image" TEXT,
    "published" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoId" TEXT,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tvshow" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT,
    "release_date" TEXT NOT NULL,
    "poster_image" TEXT,
    "background_image" TEXT,
    "published" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tvshow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "season" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "season_number" INTEGER NOT NULL,
    "season_overview" TEXT,
    "poster_image" TEXT,
    "release_date" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tvshowId" TEXT,

    CONSTRAINT "season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episode" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "release_date" TEXT,
    "seasonId" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "overview" TEXT,
    "background_image" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "videoId" TEXT,

    CONSTRAINT "episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "movieId" TEXT,
    "tvShowId" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_id_key" ON "movie"("id");

-- CreateIndex
CREATE INDEX "movie_id_createdAt_idx" ON "movie"("id", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "tvshow_id_key" ON "tvshow"("id");

-- CreateIndex
CREATE INDEX "tvshow_id_createdAt_idx" ON "tvshow"("id", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "season_id_key" ON "season"("id");

-- CreateIndex
CREATE INDEX "season_id_createdAt_idx" ON "season"("id", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "episode_id_key" ON "episode"("id");

-- CreateIndex
CREATE INDEX "episode_id_createdAt_idx" ON "episode"("id", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "genre_id_key" ON "genre"("id");

-- CreateIndex
CREATE INDEX "genre_id_createdAt_idx" ON "genre"("id", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "media_id_key" ON "media"("id");

-- CreateIndex
CREATE INDEX "media_id_createdAt_idx" ON "media"("id", "createdAt");

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season" ADD CONSTRAINT "season_tvshowId_fkey" FOREIGN KEY ("tvshowId") REFERENCES "tvshow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "episode_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "tvshow"("id") ON DELETE SET NULL ON UPDATE CASCADE;
