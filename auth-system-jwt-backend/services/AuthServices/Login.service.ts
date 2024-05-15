import bcrypt from "bcrypt";
import { Request, Response } from "../../types/express-types";

import prisma from "../../prisma";
import { AccessToken, refreshAccessToken } from "../../lib/genJwtToken";

const LoginService = async (req: Request, res: Response) => {
  const { email, password } = req.body as Login;

  try {
    const account = await prisma.account.findUnique({
      where: { email: email },
      include: {
        user: {
          select: {
            name: true,
            role: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!account) {
      return res.status(401).send({ message: "Account not found" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      account?.password as any
    );

    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const accessToken = AccessToken(account);
    const refreshToken = refreshAccessToken(account);

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export default LoginService;
