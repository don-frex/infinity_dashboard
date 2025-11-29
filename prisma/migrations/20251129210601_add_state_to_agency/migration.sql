-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Agency" ("city", "createdAt", "id", "name") SELECT "city", "createdAt", "id", "name" FROM "Agency";
DROP TABLE "Agency";
ALTER TABLE "new_Agency" RENAME TO "Agency";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
