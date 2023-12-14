import { Knex } from "knex";

export class RecordService {
  constructor(private knex: Knex) {}

  addPointRecord = async (
    userId: string,
    point: number,
    weight: number,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      await this.knex("earnPointRecords").insert({
        user_id: userId,
        earn_point: point,
        weight: weight,
        project_id: projectId,
        date_add: dateAdd,
      });

      await this.knex("userRecords")
        .where("user_id", userId)
        .update({
          total_point: this.knex.raw(`total_point + ${point}`),
          total_weight: this.knex.raw(`total_weight + ${weight}`),
        });
      return true;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getWasteRecord = async (userId: string) => {
    try {
      const result = await this.knex("earnPointRecords")
        .select("*")
        .where("user_id", userId);
      return result;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  exchangeGiftRecord = async (
    userId: string,
    giftId: string,
    exchangePoint: number,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      await this.knex("exchangeGiftRecords").insert({
        user_id: userId,
        gift_id: giftId,
        project_id: projectId,
        apply_date: dateAdd,
      });

      const result = await this.knex("userRecords")
        .where("user_id", userId)
        .update({
          total_point: this.knex.raw(`total_point - ${exchangePoint}`),
        })
        .returning("total_point");
      return result[0].total_point;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  deleteGiftRecord = async (giftId: string) => {
    await this.knex("gifts").where("gift_id", giftId).update({
      isDeleted: true,
    });
    return true;
  };
}
