import { Knex } from "knex";

export class LoginService {
  constructor(private knex: Knex) {}

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
