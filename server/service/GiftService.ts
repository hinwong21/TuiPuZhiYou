import { Knex } from "knex";

export class GiftService {
  constructor(private knex: Knex) {}

  addGift = async (
    id: string,
    detail: string,
    image: string,
    point: string,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      await this.knex("gifts").insert({
        gift_id: id,
        gift_detail: detail,
        gift_image: image,
        exchange_point: point,
        project_id: projectId,
        date_add: dateAdd,
      });

      return true;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getAllGifts = async () => {
    try {
      const result = await this.knex("gifts").select("*");
      return result;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
