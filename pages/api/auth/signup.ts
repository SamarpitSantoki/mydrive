// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../helpers/prisma";
import Password from "../../../helpers/password";
type Data = {
  email: String;
  password: String;
};

type Error = {
  message: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    const existingUser = await prisma.auth.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await Password.toHash(password);

    const user = await prisma.auth.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    res.status(200).json(user);
  } catch (e) {
    console.log(e);

    res.status(400).json({ message: "Error while signing up." });
  }
}
