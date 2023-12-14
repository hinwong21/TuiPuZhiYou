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
}
