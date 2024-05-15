import { Request, Response } from "../../types/express-types";

import prisma from "../../prisma";

const DeleteAccountService = async (req: Request, res: Response) => {
  const email = (req.user as { email: string }).email;

  const account = await prisma.account.findUnique({
    where: { email },
    include: { user: true },
  });

  if (!account) {
    return res.status(404).send("Account Not Found");
  }
  if (account.user) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    await prisma.account.delete({
      where: { id: account.id },
    });
    await prisma.user.delete({
      where: { id: account.userId },
    });
  }
};

export default DeleteAccountService;
