// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createFolder } from "../../../controllers/directory/directory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const resp = await createFolder(
      req.body.name,
      req.body.parentId,
      req.headers.ownerid as string,
      req.body.nodeType,
      req.body.url
    );
    if (!resp.sucess) {
      res.status(400).send("Error");
    }
    res.status(200).send("OK");
  }
  res.status(400).send("Error");
}
