// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createFolder } from "../../../controllers/directory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.headers.ownerid);

    const success = await createFolder(
      req.body.name,
      req.body.parentId,
      req.headers.ownerid as string
    );
    if (!success) {
      res.status(400).send("Error");
    }
    res.status(200).send("OK");
  }
  console.log(req.body);
}
