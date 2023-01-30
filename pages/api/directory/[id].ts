// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../helpers/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    if (typeof id !== "string") {
      throw new Error("id must be a string");
    }

    if (id.length === 0) {
      throw new Error("id must not be empty");
    }
    console.log("id", id);

    const resp = await prisma.node.findMany({
      where: {
        id: id === "null" ? undefined : id,
        parent: {
          is: null,
        },
      },
      select: {
        id: true,
        name: true,
        nodeType: true,
        parentId: true,
        childs: {
          select: {
            id: true,
            name: true,
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
      res.status(200).json(data);
    } else {
      res.status(200).json(resp[0]);
    }
  } catch (e: any) {
    res.status(400).send("Error");
  }

  console.log("id", id);
}
