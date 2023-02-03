// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../helpers/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resp = await prisma.node.findMany({
    where: {
      id: req.query.id as string,
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
  console.log(resp[0]);
  res.send(resp[0]);
  console.log(req.body);
}
