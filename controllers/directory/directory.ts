import { S3 } from "aws-sdk";
import prisma from "../../helpers/prisma";

const s3 = new S3({
  region: "us-east-2",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

export const createFolder = async (
  name: string,
  parentId: string,
  ownerId: string,
  nodeType: string,
  url: string
) => {
  try {
    const data = await prisma.node.create({
      data: {
        name,
        nodeType: nodeType ?? "folder",
        parentId: parentId === "null" ? null : parentId,
        ownerId,
        url,
      },
    });
    return {
      sucess: true,
    };
  } catch (e: any) {
    return {
      sucess: false,
    };
  }
};

export const getFolder = async (id: string) => {
  try {
    if (typeof id !== "string") {
      throw new Error("id must be a string");
    }

    if (id.length === 0) {
      throw new Error("id must not be empty");
    }

    const resp = await prisma.node.findMany({
      where:
        id === "null"
          ? {
              id: undefined,
              parent: {
                is: null,
              },
            }
          : { id },
      select: {
        id: true,
        name: true,
        nodeType: true,
        parentId: true,
        url: true,
        childs: {
          select: {
            id: true,
            name: true,
            url: true,
            nodeType: true,
            parentId: true,
          },
        },
      },
    });

    if (id === "null") {
      let data = {
        id: "null",
        name: "root",
        nodeType: "folder",
        parentId: null,
        childs: resp,
      };
      return {
        sucess: true,
        data,
      };
    } else {
      return {
        sucess: true,
        data: resp[0],
      };
    }
  } catch (e: any) {
    return {
      sucess: false,
    };
  }
};

export const deleteNode = async (id: string) => {
  try {
    if (typeof id !== "string") {
      throw new Error("id must be a string");
    }

    if (id.length === 0) {
      throw new Error("id must not be empty");
    }

    const resp = await prisma.node.delete({
      where: {
        id,
      },
    });

    if (resp.nodeType !== "folder") {
      s3.deleteObject({
        Bucket: process.env.BUCKET_NAME!,
        Key: resp.name,
      });
    }

    return {
      sucess: true,
    };
  } catch (e: any) {
    return {
      sucess: false,
    };
  }
};
