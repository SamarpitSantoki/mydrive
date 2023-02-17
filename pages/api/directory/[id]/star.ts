// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { starNode } from "../../../../controllers/directory/directory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.headers.ownerid) {
    return res.status(400).send("Error");
  }

  const { id } = req.query;
  const { value } = req.body;
  if (req.method === "PUT") {
    const resp = await starNode(id as string, value);
    if (!resp.sucess) {
      return res.status(400).send("Error");
    }
    return res.status(200).send(resp);
  }

  return res.status(400).send("Not Found");
}
