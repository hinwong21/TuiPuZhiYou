import express from "express";
import { errorHandler } from "../error";
import { AccountService } from "../service/AccountService";
import { getRandomSixDigitNumber } from "../useFetch/getRandomNumber";
import { transformLowerToUpper } from "../useFetch/transformLowerToUpper";

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
      let unit: string = transformLowerToUpper(req.body.unit);
      const projectId = req.body.project_id;
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
        return res.json({ success: true, user_id: userId });
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
      return res.json({ result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  singleUserDetail = async (req: express.Request, res: express.Response) => {
    try {
      const id = req.body.id;
      const result = await this.accountService.singleUserDetail(id);
      return res.json({ result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  searchUserByAddress = async (req: express.Request, res: express.Response) => {
    try {
      const street: string = req.body.street;
      const number: string = req.body.number;
      const floor: string = req.body.floor;
      const unit: string = transformLowerToUpper(req.body.unit);

      const result = await this.accountService.searchUserByAddress(
        street,
        number,
        floor,
        unit
      );
      return res.json({ result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  searchUserByEmailOrPhoneNum = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const emailOrPhoneNum = req.body.emailOrPhoneNum;
      const result = await this.accountService.searchUserByEmailOrPhoneNum(
        emailOrPhoneNum
      );
      return res.json({ result: result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  changePassword = async (req: express.Request, res: express.Response) => {
    try {
      const adminName = req.body.adminName;
      const password = req.body.password;
      const result = await this.accountService.changePassword(
        adminName,
        password
      );
      if (result) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
