-- AlterTable
ALTER TABLE "season" ADD COLUMN     "tvshowId" UUID;

-- CreateTable
CREATE TABLE "episode" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "override" TEXT,
    "episode_number" INTEGER NOT NULL,
    "release_date" TEXT NOT NULL,
    "seasonId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "episode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "season" ADD CONSTRAINT "season_tvshowId_fkey" FOREIGN KEY ("tvshowId") REFERENCES "tvshow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE SET NULL ON UPDATE CASCADE;
