import express from "express";
import { errorHandler } from "../error";
import { AccountService } from "../service/AccountService";
import session from "express-session";

function getRandomSixDigitNumber() {
  const dateNow = new Date();
  const timestamp = dateNow.getTime().toString();
  const randomSixDigits = timestamp.substr(timestamp.length - 6).toString();
  return randomSixDigits;
}

export class AccountController {
  constructor(private accountService: AccountService) {}

  registerNewAccount = async (req: express.Request, res: express.Response,) => {
    const today = new Date();
    try {
      const userId = getRandomSixDigitNumber();
      const username: string = req.body.username;
      const emailOrPhoneNum: string = req.body.emailOrPhoneNum;
      const password: string = req.body.password;
      const street: string = req.body.street;
      const number: string = req.body.number;
      const floor: string = req.body.floor;
      const unit: string = req.body.unit;
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
      req.session.userId = userId;
      req.session.username = username;
      req.session.isLogin = true;

      console.log(req.session.userId);

      res.redirect("/");
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  login = async (req: express.Request, res: express.Response) => {
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
