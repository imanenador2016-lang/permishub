-- CreateEnum
CREATE TYPE "Region" AS ENUM ('BE', 'WALLONIE', 'BRUXELLES', 'FLANDRE');

-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('fr', 'nl');

-- CreateEnum
CREATE TYPE "Niveau" AS ENUM ('DEBUTANT', 'INTERMEDIAIRE', 'PRET');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "StatutRemboursement" AS ENUM ('NON_APPLICABLE', 'DEMANDE', 'APPROUVE', 'REFUSE', 'REMBOURSE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "region" "Region",
    "preferredLang" "Lang" NOT NULL DEFAULT 'fr',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "titleFr" TEXT NOT NULL,
    "titleNl" TEXT NOT NULL,
    "descFr" TEXT NOT NULL,
    "descNl" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "estMinutes" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursModule" (
    "id" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "titleFr" TEXT NOT NULL,
    "titleNl" TEXT NOT NULL,
    "contentFr" JSONB NOT NULL,
    "contentNl" JSONB NOT NULL,

    CONSTRAINT "CoursModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "region" "Region" NOT NULL DEFAULT 'BE',
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "textFr" TEXT NOT NULL,
    "textNl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "choices" JSONB NOT NULL,
    "explanationFr" TEXT NOT NULL,
    "explanationNl" TEXT NOT NULL,
    "factRef" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestDeNiveau" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scoreByTheme" JSONB NOT NULL,
    "level" "Niveau" NOT NULL,
    "answers" JSONB NOT NULL,

    CONSTRAINT "TestDeNiveau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressionUtilisateur" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "pctDone" INTEGER NOT NULL DEFAULT 0,
    "weakTheme" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProgressionUtilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamenBlancSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "score" INTEGER,
    "passed" BOOLEAN,

    CONSTRAINT "ExamenBlancSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamenBlancReponse" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,

    CONSTRAINT "ExamenBlancReponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CentreExamen" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "region" "Region" NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CentreExamen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circuit" (
    "id" TEXT NOT NULL,
    "centreId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL DEFAULT 2499,
    "distanceKm" DOUBLE PRECISION,
    "attentionPointsCount" INTEGER,
    "difficulte" TEXT,
    "googleMapsDirectionsUrl" TEXT,

    CONSTRAINT "Circuit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchatCircuit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "circuitId" TEXT NOT NULL,
    "montant" INTEGER NOT NULL,
    "dateAchat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statutRemboursement" "StatutRemboursement" NOT NULL DEFAULT 'NON_APPLICABLE',
    "dateLimiteDemandeRemboursement" TIMESTAMP(3),
    "stripePaymentIntentId" TEXT,

    CONSTRAINT "AchatCircuit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchatPack" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "montant" INTEGER NOT NULL,
    "dateAchat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripePaymentIntentId" TEXT,

    CONSTRAINT "AchatPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemandeVilleCircuit" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ville" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemandeVilleCircuit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointCircuit" (
    "id" TEXT NOT NULL,
    "circuitId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "noteFr" TEXT,
    "noteNl" TEXT,
    "difficulte" TEXT,

    CONSTRAINT "PointCircuit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abonnement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "stripeId" TEXT,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Abonnement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_slug_key" ON "Theme"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressionUtilisateur_userId_themeId_key" ON "ProgressionUtilisateur"("userId", "themeId");

-- CreateIndex
CREATE UNIQUE INDEX "CentreExamen_slug_key" ON "CentreExamen"("slug");

-- CreateIndex
CREATE INDEX "AchatPack_userId_offerId_idx" ON "AchatPack"("userId", "offerId");

-- CreateIndex
CREATE UNIQUE INDEX "Abonnement_userId_key" ON "Abonnement"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursModule" ADD CONSTRAINT "CoursModule_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestDeNiveau" ADD CONSTRAINT "TestDeNiveau_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressionUtilisateur" ADD CONSTRAINT "ProgressionUtilisateur_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenBlancSession" ADD CONSTRAINT "ExamenBlancSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenBlancReponse" ADD CONSTRAINT "ExamenBlancReponse_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ExamenBlancSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenBlancReponse" ADD CONSTRAINT "ExamenBlancReponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Circuit" ADD CONSTRAINT "Circuit_centreId_fkey" FOREIGN KEY ("centreId") REFERENCES "CentreExamen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchatCircuit" ADD CONSTRAINT "AchatCircuit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchatCircuit" ADD CONSTRAINT "AchatCircuit_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "Circuit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchatPack" ADD CONSTRAINT "AchatPack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointCircuit" ADD CONSTRAINT "PointCircuit_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "Circuit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abonnement" ADD CONSTRAINT "Abonnement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
