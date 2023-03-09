-- CreateTable
CREATE TABLE "auth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "node" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "nodeType" TEXT NOT NULL DEFAULT 'folder',
    "isStarred" BOOLEAN NOT NULL DEFAULT false,
    "nodeSize" DOUBLE PRECISION,
    "tags" TEXT[],
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "sharedWith" TEXT[],
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "node_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_email_key" ON "auth"("email");

-- CreateIndex
CREATE INDEX "ownerId" ON "node"("ownerId");

-- AddForeignKey
ALTER TABLE "node" ADD CONSTRAINT "node_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "node"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
