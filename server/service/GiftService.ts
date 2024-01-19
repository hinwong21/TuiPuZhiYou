import { Knex } from "knex";

export class GiftService {
  constructor(private knex: Knex) {}

  addGift = async (
    id: string,
    giftName: string,
    detail: string,
    image: string,
    point: string,
    amount: string,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      await this.knex("gifts").insert({
        gift_id: id,
        gift_name: giftName,
        gift_detail: detail,
        gift_image: image,
        exchange_point: point,
        amount: amount,
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
      const gifts = await this.knex("gifts").select("*").orderBy("date_add");
      const giftAmountCounts = await this.knex("exchangeGiftRecords")
        .select("gift_id")
        .groupBy("gift_id")
        .count("user_id as count");

      const result = gifts.map((gift) => {
        const giftAmountCount =
          giftAmountCounts.find((count) => count.gift_id === gift.gift_id) || 0;
        return {
          ...gift,
          giftAmountCount: giftAmountCount,
        };
      });
      return result;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  deleteGift = async (giftId: string) => {
    await this.knex("gifts").where("gift_id", giftId).update({
      isDeleted: true,
    });
    return true;
  };
}
