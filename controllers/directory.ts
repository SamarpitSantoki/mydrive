import prisma from "../helpers/prisma";

export const createFolder = async (
  name: string,
  parentId: string,
  ownerId: string
) => {
  try {
    const data = await prisma.node.create({
      data: {
        name,
        nodeType: "folder",
        parent:
          parentId !== "null"
            ? {
                connect: {
                  id: parentId,
                },
              }
            : undefined,
        ownerId,
      },
    });
  } catch (e: any) {
    console.log(e);

    return false;
  }
  return true;
};
