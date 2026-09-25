-- Premium Maps URLs are imported into Neon from a Git-ignored local source.
-- This migration and the public repository contain no route values.
CREATE TABLE "CircuitPremiumLink" (
    "circuitId" TEXT NOT NULL,
    "mapsUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CircuitPremiumLink_pkey" PRIMARY KEY ("circuitId")
);
