/*
  Warnings:

  - You are about to drop the column `capital` on the `EuCountry` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `EuCountry` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `EuCountry` table. All the data in the column will be lost.
  - You are about to drop the column `population` on the `EuCountry` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `VisitedCountry` table. All the data in the column will be lost.
  - You are about to drop the column `dateVisited` on the `VisitedCountry` table. All the data in the column will be lost.
  - Added the required column `averageEnglishLevelRating` to the `EuCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averagePriceRating` to the `EuCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageQueerFriendlyRating` to the `EuCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageSafetyRating` to the `EuCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageSoloFriendlyRating` to the `EuCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryInitials` to the `EuCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `EuCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryInitials` to the `VisitedCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `englishLevelRating` to the `VisitedCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceRating` to the `VisitedCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queerFriendlyRating` to the `VisitedCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `safetyRating` to the `VisitedCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soloFriendlyRating` to the `VisitedCountry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VisitedCountry" DROP CONSTRAINT "VisitedCountry_countryId_fkey";

-- DropIndex
DROP INDEX "country_idx";

-- DropIndex
DROP INDEX "user_idx";

-- AlterTable
ALTER TABLE "EuCountry" DROP COLUMN "capital",
DROP COLUMN "language",
DROP COLUMN "name",
DROP COLUMN "population",
ADD COLUMN     "averageEnglishLevelRating" INTEGER NOT NULL,
ADD COLUMN     "averagePriceRating" INTEGER NOT NULL,
ADD COLUMN     "averageQueerFriendlyRating" INTEGER NOT NULL,
ADD COLUMN     "averageSafetyRating" INTEGER NOT NULL,
ADD COLUMN     "averageSoloFriendlyRating" INTEGER NOT NULL,
ADD COLUMN     "countryInitials" TEXT NOT NULL,
ADD COLUMN     "countryName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VisitedCountry" DROP COLUMN "countryId",
DROP COLUMN "dateVisited",
ADD COLUMN     "countryInitials" TEXT NOT NULL,
ADD COLUMN     "englishLevelRating" INTEGER NOT NULL,
ADD COLUMN     "priceRating" INTEGER NOT NULL,
ADD COLUMN     "queerFriendlyRating" INTEGER NOT NULL,
ADD COLUMN     "safetyRating" INTEGER NOT NULL,
ADD COLUMN     "soloFriendlyRating" INTEGER NOT NULL;
