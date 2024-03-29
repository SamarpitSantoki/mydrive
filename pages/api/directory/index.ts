// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createFolder } from "../../../controllers/directory/directory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {

    if (req.headers.ownerid === undefined) {
      return res.status(400).send("Error");
    }

    const resp = await createFolder(
      req.body.name,
      req.body.parentId,
      req.headers.ownerid as string,
      req.body.nodeType,
      req.body.url,
      req.body.s3Url,
      req.body.nodeSize
    );
    if (!resp.sucess) {
      return res.status(400).send("Error");
    }
    return res.status(200).send("OK");
  }
  res.status(400).send("Error");
}
