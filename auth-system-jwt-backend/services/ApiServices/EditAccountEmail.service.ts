import { Request, Response } from "../../types/express-types";

import prisma from "../../prisma";

const EditAccountEmailService = async (req: Request, res: Response) => {
  const { newEmail } = req.body;

  const email = (req.user as { email: string }).email;

  if (!newEmail) {
    return res.status(400).send("Missing Required Fields");
  }

  await prisma.account.update({
    where: { email: email },
    data: { email: newEmail },
  });

  return res.status(200).send("Successfully changed email");
};
export default EditAccountEmailService;
