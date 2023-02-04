-- CreateTable
CREATE TABLE "genre" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "movieId" UUID,
    "tvShowId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "tvshow"("id") ON DELETE SET NULL ON UPDATE CASCADE;
