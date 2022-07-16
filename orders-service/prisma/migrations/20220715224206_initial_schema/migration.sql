-- CreateTable
CREATE TABLE "Collections" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isLargeSize" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemsCollections" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "ItemsCollections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemsCollections" ADD CONSTRAINT "ItemsCollections_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsCollections" ADD CONSTRAINT "ItemsCollections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
