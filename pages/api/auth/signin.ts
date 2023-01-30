// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../helpers/connectMongo";
import prisma from "../../../helpers/prisma";
import Password from "../../../helpers/password";
import { IRespSignIn } from "../../../types";
type Data = {
  email: String;
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

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const hashedPassword = await Password.compare(
      existingUser!.password,
      password
    );

    if (!hashedPassword) {
      return res.status(400).json({ message: "Invalid password." });
    }
    // remove this by creating a seperate user schema as creating a new object is not a good practice
    let resp: IRespSignIn = existingUser;
    delete resp.password;

    res.status(200).json(resp);
  } catch (e) {
    console.log(e);

    res.status(400).json({ message: "Error while signing up." });
  }
}
