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

  registerNewAccount = async (req: express.Request, res: express.Response) => {
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

      if (result) {
        // req.session.userId = userId;
        // req.session.username = username;
        // req.session.isLogin = true;

        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  login = async (req: express.Request, res: express.Response) => {
    try {
      const phoneNumOrEmail = req.body.phoneNumOrEmail;
      const password = req.body.password;

      const result = await this.accountService.login(phoneNumOrEmail, password);

      console.log(result);

      return res.json({ result: result });

      // console.log(req.session.username);
    } catch (err) {
      console.log(err);
    }
  };
}
