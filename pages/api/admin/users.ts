import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../helpers/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get all registered users
  const users = await prisma.auth.findMany({});
  res.status(200).json(users);
}
