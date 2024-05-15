import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { Request, Response } from "../../types/express-types";

import prisma from "../../prisma";

const RegisterService = async (req: Request, res: Response) => {
  const { email, name, password } = req.body as Register;
  let avatarUrl: string | undefined;

  if (req.file) {
    const uniqueFilename = Date.now() + "-" + req.file.originalname;
    const uploadPath = path.join(__dirname, "../../uploads", uniqueFilename);

    fs.writeFileSync(uploadPath, req.file.buffer);

    avatarUrl = `http://localhost:5000/uploads/${uniqueFilename}`;
  }

  const user = await prisma.account.findUnique({
    where: { email: email },
    include: { user: true },
  });

  if (!user) {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.account.create({
      data: {
        email: email,
        password: hashedPassword,
        user: {
          create: {
            name: name,
            avatarUrl: avatarUrl,
          },
        },
      },
    });
    return res.status(200).send("Account Created");
  } else {
    return res.status(401).send("Account is already taken");
  }
};

export default RegisterService;
