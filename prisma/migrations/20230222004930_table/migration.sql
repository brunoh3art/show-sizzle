-- DropIndex
DROP INDEX "episode_id_key";

-- DropIndex
DROP INDEX "genre_id_key";

-- DropIndex
DROP INDEX "media_id_key";

-- DropIndex
DROP INDEX "movie_id_key";

-- DropIndex
DROP INDEX "season_id_key";

-- DropIndex
DROP INDEX "tvshow_id_key";

-- AlterTable
ALTER TABLE "episode" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "genre" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "media" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "movie" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "season" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tvshow" ALTER COLUMN "id" DROP DEFAULT;
