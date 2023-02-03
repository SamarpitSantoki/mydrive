import { S3 } from "aws-sdk";
// Create service client module using ES6 syntax.
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "us-east-2";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION,credentials:{
  accessKeyId: process.env.ACCESS_KEY!,
  secretAccessKey: process.env.SECRET_KEY!,
} });

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
    console.log(resp);

    if (resp!.nodeType !== "folder") {
      console.log(resp!.url?.split("/").pop()!);

      const res = await s3Client.send(new DeleteObjectCommand(
        {
          Bucket: process.env.BUCKET_NAME!,
          Key: resp!.url?.split("/").pop()!,
        }
      )).catch((err) => {
        console.log(err);
      });

      console.log('check',res);
      // s3.deleteObject(
      //   {
      //     Bucket: process.env.BUCKET_NAME!,
      //     Key: resp.url?.split("/").pop()!,
      //   },
      //   (err, data) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log(data);
      //     }
      //   }
      // );
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
