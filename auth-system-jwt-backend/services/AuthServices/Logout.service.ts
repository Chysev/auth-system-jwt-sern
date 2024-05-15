import { Request, Response } from "../../types/express-types";

const LogoutService = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).send("Successfully Logged Out");
};

export default LogoutService;
