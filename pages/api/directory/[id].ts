// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteNode,
  getFolder,
} from "../../../controllers/directory/directory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "GET") {
    const resp = await getFolder(id as string);
    if (!resp.sucess) {
      res.status(400).send("Error");
    }
    res.status(200).send(resp.data);
  }

  if (req.method === "DELETE") {
    const resp = await deleteNode(id as string);

    if (!resp.sucess) {
      res.status(400).send("Error");
    }
    res.status(200).send("OK");
  }
}
