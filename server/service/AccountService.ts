import { Knex } from "knex";

export class AccountService {
  constructor(private knex: Knex) {}

  registerNewAccount = async (
    userId: string,
    username: string,
    emailOrPhoneNum: string,
    password: string,
    street: string,
    number: string,
    floor: string,
    unit: string,
    projectId: string,
    dateAdd: Date
  ) => {
    console.log(emailOrPhoneNum, 1);
    console.log(password, 2);

    try {
      const account = await this.knex("users").insert({
        user_id: userId,
        username: username,
        emailOrPhoneNum: emailOrPhoneNum,
        password: password,
        street: street,
        number: number,
        floor: floor,
        unit: unit,
        project_id: projectId,
        date_add: dateAdd,
      });
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  login = async (
    emailOrPhoneNum: string,
    password: string,
    rememberMe?: boolean
  ) => {
    try {
      const [result] = await this.knex("admins")
        .select("usersname", "password")
        .where("username", emailOrPhoneNum);

      console.log(result);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
