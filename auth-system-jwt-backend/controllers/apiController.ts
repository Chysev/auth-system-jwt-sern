import { Request, Response } from "../types/express-types";

import asyncHandler from "./asyncHandler";
import TokenService from "../services/ApiServices/Token.service";
import UserListService from "../services/ApiServices/UserList.service";
import AdminTokenService from "../services/ApiServices/AdminToken.service";
import DeleteAccountService from "../services/ApiServices/DeleteAccount.service";
import EditAccountEmailService from "../services/ApiServices/EditAccountEmail.service";

const apiController = {
  Token: asyncHandler(async (req: Request, res: Response) => {
    await TokenService(req, res);
  }),

  AdminToken: asyncHandler(async (req: Request, res: Response) => {
    await AdminTokenService(req, res);
  }),

  UserList: asyncHandler(async (req: Request, res: Response) => {
    const account = await UserListService();
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).send({ error: "Account Not Found" });
    }
  }),

  DeleteAccount: asyncHandler(async (req: Request, res: Response) => {
    await DeleteAccountService(req, res);
    res.status(200).send("Account Deleted Successfully");
  }),

  EditAccountEmail: asyncHandler(async (req: Request, res: Response) => {
    await EditAccountEmailService(req, res);
    res.status(200).send("Account Email Updated Successfully");
  }),
};

export default apiController;
