-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contact_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserUsage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "UserUsage_userId_date_key" ON "UserUsage"("userId", "date");
