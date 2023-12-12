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
    try {
      await this.knex("users").insert({
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
      return true;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  login = async (emailOrPhoneNum: string, password: string) => {
    try {
      const [adminResult] = await this.knex("admins")
        .select("user_id", "username")
        .where("username", emailOrPhoneNum)
        .andWhere("password", password);

      if (adminResult == undefined) {
        const [userResult] = await this.knex("users")
          .select("user_id", "username")
          .where("emailOrPhoneNum", emailOrPhoneNum)
          .andWhere("password", password);

        if (userResult === undefined) {
          return { success: false };
        } else {
          return { success: true, result: userResult, isAdmin: false };
        }
      } else {
        return { success: true, result: adminResult, isAdmin: true };
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  singleUserDetail = async (id: string | undefined) => {
    try {
      const userId = parseInt(id!);
      if (userId < 13) {
        const result = await this.knex("admins")
          .select("*")
          .where("user_id", id);
        return result;
      } else {
        const result = await this.knex("users")
          .select("*")
          .where("user_id", id);
        return result;
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
