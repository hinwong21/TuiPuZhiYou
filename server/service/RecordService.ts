import { log } from "console";
import { Knex } from "knex";
import { unescapeLeadingUnderscores } from "typescript";

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

  // updateGiftAmt = async (giftId: string) => {
  //   try {
  //     const updateTime = new Date();
  //     //Updated gift amount
  //     const updateGift = await this.knex("gifts")
  //       .where("gift_id", giftId)
  //       .update({
  //         amount: this.knex.raw(`amount - ${1}`),
  //         date_update: updateTime,
  //       });

  //     return true;
  //   } catch (err) {
  //     throw new Error((err as Error).message);
  //   }
  // };

  exchangeGiftRecord = async (
    id: string,
    userId: string,
    giftId: string,
    exchangePoint: number,
    projectId: string,
    dateAdd: Date
  ) => {
    try {
      const exGiftID = await this.knex("exchangeGiftRecords")
        .insert({
          exchangeGiftRecords_id: id,
          user_id: userId,
          gift_id: giftId,
          project_id: projectId,
          apply_date: dateAdd,
        })
        .returning("exchangeGiftRecords_id");

      const totalPoint = await this.knex("userRecords")
        .where("user_id", userId)
        .update({
          total_point: this.knex.raw(`total_point - ${exchangePoint}`),
        })
        .returning("total_point");
      return {
        exGiftID: exGiftID[0].exchangeGiftRecords_id,
        point: totalPoint[0].total_point,
      };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  joinEventRecord = async (
    userId: string,
    eventId: string,
    projectId: string,
    dateAdd: Date
  ) => {
    await this.knex("joinedEventRecords").insert({
      user_id: userId,
      event_id: eventId,
      project_id: projectId,
      apply_date: dateAdd,
    });
    return true;
  };

  // updateEvent = async (eventId: string) => {
  //   try {
  //     //Updated gift amount
  //     const updateEvent = await this.knex("events")
  //       .where("event_id", eventId)
  //       .update({
  //         participant: this.knex.raw(`participant - ${1}`),
  //         // date_add: this.knex.raw(`date_add`),
  //       });

  //     return true;
  //   } catch (err) {
  //     throw new Error((err as Error).message);
  //   }
  // };

  // user
  getAllExchangeGiftRecord = async (userId: string) => {
    try {
      const records = await this.knex("exchangeGiftRecords")
        .select("exchangeGiftRecords.*", "gifts.*")
        .join("gifts", "exchangeGiftRecords.gift_id", "=", "gifts.gift_id")
        .where("exchangeGiftRecords.user_id", userId)
        .orderBy("apply_date", "desc");
      return records;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  // user
  getAllJoinedEventRecords = async (userId: string) => {
    try {
      const records = await this.knex("joinedEventRecords")
        .select("joinedEventRecords.*", "events.*")
        .join("events", "joinedEventRecords.event_id", "=", "events.event_id")
        .where("joinedEventRecords.user_id", userId)
        .orderBy("apply_date", "desc");
      return records;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getAllProjectUserDetail = async (project: string, start: Date, end: Date) => {
    try {
      if (project === "全部") {
        const startDate = new Date(start);
        startDate.setDate(startDate.getDate() + 1);
        const startDayStr = startDate.toISOString();
        const endDate = new Date(end);
        endDate.setDate(endDate.getDate() + 1);
        const endDayStr = endDate.toISOString();

        const records = await this.knex("users")
          .select(
            "users.*",
            "userRecords.total_point",
            "userRecords.total_weight",
            "thisSelectedDateRangeWeight.selectedWeight"
          )
          .orderBy("date_add", "desc")
          .leftJoin("userRecords", "users.user_id", "userRecords.user_id")
          .leftJoin(
            this.knex("earnPointRecords")
              .select("user_id")
              .sum("weight as selectedWeight")
              .whereBetween("date_add", [startDayStr, endDayStr])
              .groupBy("user_id")
              .as("thisSelectedDateRangeWeight"),
            "users.user_id",
            "thisSelectedDateRangeWeight.user_id"
          );
        return records;
      } else {
        const startDate = new Date(start);
        startDate.setDate(startDate.getDate() + 1);
        const startDayStr = startDate.toISOString();
        const endDate = new Date(end);
        endDate.setDate(endDate.getDate() + 1);
        const endDayStr = endDate.toISOString();

        const records = await this.knex("users")
          .select(
            "users.*",
            "userRecords.total_point",
            "userRecords.total_weight",
            "thisSelectedDateRangeWeight.selectedWeight"
          )
          .orderBy("date_add", "desc")
          .leftJoin("userRecords", "users.user_id", "userRecords.user_id")
          .leftJoin(
            this.knex("earnPointRecords")
              .select("user_id")
              .sum("weight as selectedWeight")
              .whereBetween("date_add", [startDayStr, endDayStr])
              .groupBy("user_id")
              .as("thisSelectedDateRangeWeight"),
            "users.user_id",
            "thisSelectedDateRangeWeight.user_id"
          )
          .where("users.project_id", "=", project);
        return records;
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getAllProjectExchangeGiftDetails = async (project: string) => {
    try {
      if (project === "全部") {
        const records = await this.knex("exchangeGiftRecords")
          .select("exchangeGiftRecords.*", "gifts.*", "users.*")
          .orderBy("apply_date", "desc")
          .join("gifts", "exchangeGiftRecords.gift_id", "=", "gifts.gift_id")
          .join("users", "exchangeGiftRecords.user_id", "=", "users.user_id");
        return records;
      } else {
        const records = await this.knex("exchangeGiftRecords")
          .select("exchangeGiftRecords.*", "gifts.*", "users.*")
          .orderBy("apply_date", "desc")
          .join("gifts", "exchangeGiftRecords.gift_id", "=", "gifts.gift_id")
          .join("users", "exchangeGiftRecords.user_id", "=", "users.user_id")
          .where("exchangeGiftRecords.project_id", project);

        return records;
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getAllProjectJoinedEventDetails = async (project: string) => {
    try {
      if (project === "全部") {
        const records = await this.knex("events")
          .select("events.*", "joinedEventRecords.participantJoined")
          .orderBy("date_add", "desc")
          .leftJoin(
            this.knex("joinedEventRecords")
              .select("event_id")
              .count("user_id as participantJoined")
              .groupBy("event_id")
              .as("joinedEventRecords"),
            "events.event_id",
            "joinedEventRecords.event_id"
          );
        return records;
      } else {
        const records = await this.knex("events")
          .select("events.*", "joinedEventRecords.participantJoined")
          .orderBy("date_add", "desc")
          .where("events.project_id", project)
          .leftJoin(
            this.knex("joinedEventRecords")
              .select("event_id")
              .count("user_id as participantJoined")
              .groupBy("event_id")
              .as("joinedEventRecords"),
            "events.event_id",
            "joinedEventRecords.event_id"
          );
        return records;
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getGiftExchangeRecordByGiftId = async (id: string) => {
    try {
      const records = await this.knex("exchangeGiftRecords")
        .select("exchangeGiftRecords.*", "users.*", "gifts.*")
        .join("users", "exchangeGiftRecords.user_id", "=", "users.user_id")
        .join("gifts", "exchangeGiftRecords.gift_id", "=", "gifts.gift_id")
        .where("exchangeGiftRecords.exchangeGiftRecords_id", id);
      return records;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  checkGiftAmt = async (id: string) => {
    try {
      const records = await this.knex("gifts")
        .select("amount")
        .where("gift_id", id);

      return records;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  checkExchangeGiftAmt = async (id: string) => {
    try {
      const exchangeGiftAmt = await this.knex("exchangeGiftRecords")
        .select("gift_id")
        .count("* as totalExchangeCount")
        .groupBy("gift_id")
        .where("gift_id", id);

      console.log(exchangeGiftAmt, "exchangeGiftAmt");

      return exchangeGiftAmt;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  checkParticipant = async (id: string) => {
    try {
      const joinedAmt = await this.knex("joinedEventRecords")
        .select("event_id")
        .count("* as totalJoinCount")
        .groupBy("event_id")
        .where("event_id", id);

      const getParticipants = await this.knex("events")
        .select("participant")
        .first();

      console.log(joinedAmt, "..joinedAmt");
      console.log(getParticipants, "..getParticipants");

      const toStr = joinedAmt[0].totalJoinCount.toString();
      console.log(toStr, "Str");

      const resultInt = parseInt(toStr, 10);
      const isFull = getParticipants >= resultInt ? true : false;

      return isFull;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  setGiftIsExchanged = async (id: string) => {
    const today = new Date();
    try {
      const result = await this.knex("exchangeGiftRecords")
        .where("exchangeGiftRecords_id", id)
        .update({ exchange_date: today })
        .update({ isExchanged: true })
        .returning("exchange_date");

      return result;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  uploadJoinEventRecord = async (
    user_id: string,
    event_name: string,
    apply_date: Date,
    project: string
  ) => {
    try {
      const result = await this.knex("events")
        .select("event_id")
        .where("event_name", event_name)
        .first();

      await this.knex("joinedEventRecords").insert({
        user_id: user_id,
        event_id: result.event_id,
        apply_date: apply_date,
        project_id: project,
      });
      return true;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  uploadExchangeGiftRecord = async (
    id: string,
    userId: string,
    giftName: string,
    isExchanged: boolean,
    projectId: string,
    apply_date: Date,
    exchange_date: Date | undefined
  ) => {
    try {
      const result = await this.knex("gifts")
        .select("gift_id", "exchange_point")
        .where("gift_name", giftName)
        .first();

      await this.knex("exchangeGiftRecords").insert({
        exchangeGiftRecords_id: id,
        user_id: userId,
        gift_id: result.gift_id,
        isExchanged: isExchanged,
        project_id: projectId,
        apply_date: apply_date,
        exchange_date: exchange_date,
      });

      await this.knex("userRecords")
        .where("user_id", userId)
        .update({
          total_point: this.knex.raw(`total_point - ${result.exchange_point}`),
        });
      return true;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  getAllPointRecords = async (project: string, start: Date, end: Date) => {
    try {
      if (project === "全部") {
        const startDate = new Date(start);
        startDate.setDate(startDate.getDate() + 1);
        const startDayStr = startDate.toISOString();
        const endDate = new Date(end);
        endDate.setDate(endDate.getDate() + 1);
        const endDayStr = endDate.toISOString();

        const records = await this.knex("earnPointRecords")
          .select("*")
          .whereBetween("earnPointRecords.date_add", [startDayStr, endDayStr])
          .orderBy("earnPointRecords.date_add", "desc")
          .join("users", "earnPointRecords.user_id", "=", "users.user_id");
        return records;
      } else {
        const startDate = new Date(start);
        startDate.setDate(startDate.getDate() + 1);
        const startDayStr = startDate.toISOString();
        const endDate = new Date(end);
        endDate.setDate(endDate.getDate() + 1);
        const endDayStr = endDate.toISOString();
        const records = await this.knex("earnPointRecords")
          .select("*")
          .whereBetween("earnPointRecords.date_add", [startDayStr, endDayStr])
          .orderBy("earnPointRecords.date_add", "desc")
          .join("users", "earnPointRecords.user_id", "=", "users.user_id")
          .where("earnPointRecords.project_id", "=", project);
        return records;
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
