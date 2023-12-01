import { Request, Response } from "express";
import { errorHandler } from "../error";
import { AccountService } from "../service/AccountService";

export class AccountController {
  constructor(private accountService: AccountService) {}

  registerNewAccount = async (req: Request, res: Response) => {
    const today = new Date();
    try {
      const userId = 123456;
      const username = req.body.username;
      const emailOrPhoneNum = req.body.emailOrPhoneNum;
      const password = req.body.password;
      const street = req.body.street;
      const number = req.body.number;
      const floor = req.body.floor;
      const unit = req.body.unit;
      const projectId = "P001";
      const dateAdd = today;

      const result = await this.accountService.registerNewAccount(
        userId,
        username,
        emailOrPhoneNum,
        password,
        street,
        number,
        floor,
        unit,
        projectId,
        dateAdd
      );
      // req.session.userId = userId;
      // req.session.username = username;
      // req.session.isLogin = true;

      // console.log(req.session.username);
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  login = async (req: Request) => {
    try {
      const emailOrPhoneNum = req.body.emailOrPhoneNum;
      const password = req.body.password;

      const result = await this.accountService.login(emailOrPhoneNum, password);
      // req.session.userId = userId;
      // req.session.username = username;
      // req.session.isLogin = true;

      // console.log(req.session.username);
    } catch (err) {
      console.log(err);
    }
  };
}
