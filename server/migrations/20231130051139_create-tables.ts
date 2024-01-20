import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("projects"))) {
    await knex.schema.createTable("projects", (table) => {
      table.string("project_id", 255).notNullable().unique();
      table.string("project_name", 60).notNullable();
      table.date("date_add").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("admins"))) {
    await knex.schema.createTable("admins", (table) => {
      table.string("user_id", 255).notNullable().unique();
      table.string("username", 60).notNullable();
      table.string("password", 255).notNullable();
      table.boolean("isVolunteer").notNullable().defaultTo(false);
      table.boolean("isAdmin").notNullable().defaultTo(false);
      table.boolean("isManager").notNullable().defaultTo(false);
      table.string("project_id");
    });
  }

  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table.string("user_id", 255).notNullable().unique();
      table.string("username", 60).notNullable();
      table.string("emailOrPhoneNum", 60).notNullable().unique();
      table.string("password", 255).notNullable();
      table.string("street", 255).notNullable();
      table.string("number", 255).notNullable();
      table.string("floor", 255).notNullable();
      table.string("unit", 255).notNullable();
      table.string("project_id").references("projects.project_id");
      table.date("date_add").notNullable();
      table.dateTime("date_update");
    });
  }

  if (!(await knex.schema.hasTable("userRecords"))) {
    await knex.schema.createTable("userRecords", (table) => {
      table.string("user_id").references("users.user_id");
      table.decimal("total_point").notNullable().defaultTo(0);
      table.decimal("total_weight").notNullable().defaultTo(0);
    });
  }

  if (!(await knex.schema.hasTable("earnPointRecords"))) {
    await knex.schema.createTable("earnPointRecords", (table) => {
      table.string("user_id").references("users.user_id");
      table.decimal("earn_point");
      table.decimal("weight");
      table.string("project_id").references("projects.project_id");
      table.date("date_add").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("gifts"))) {
    await knex.schema.createTable("gifts", (table) => {
      table.string("gift_id", 255).notNullable().unique();
      table.text("gift_name").notNullable();
      table.text("gift_detail").notNullable();
      table.text("gift_image");
      table.decimal("exchange_point").notNullable();
      table.integer("amount").notNullable();
      table.string("project_id").references("projects.project_id");
      table.date("date_add").notNullable();
      table.boolean("isDeleted").defaultTo(false);
      table.dateTime("date_update");
    });
  }

  if (!(await knex.schema.hasTable("exchangeGiftRecords"))) {
    await knex.schema.createTable("exchangeGiftRecords", (table) => {
      table.string("exchangeGiftRecords_id").notNullable().unique();
      table.string("user_id").references("users.user_id");
      table.string("gift_id").references("gifts.gift_id");
      table.boolean("isExchanged").defaultTo(false);
      table.string("project_id").references("projects.project_id");
      table.date("apply_date").notNullable();
      table.date("exchange_date");
      //table.dateTime("date_update");
    });
  }

  if (!(await knex.schema.hasTable("events"))) {
    await knex.schema.createTable("events", (table) => {
      table.string("event_id", 255).notNullable().unique();
      table.text("event_name").notNullable();
      table.text("event_image");
      table.text("event_detail").notNullable();
      table.integer("participant").notNullable();
      table.string("project_id").references("projects.project_id");
      table.date("date_add").notNullable();
      table.boolean("isDeleted").defaultTo(false);
      table.dateTime("date_update");
    });
  }

  if (!(await knex.schema.hasTable("joinedEventRecords"))) {
    await knex.schema.createTable("joinedEventRecords", (table) => {
      table.string("user_id").references("users.user_id");
      table.string("event_id").references("events.event_id");
      table.date("apply_date").notNullable();
      table.string("project_id").references("projects.project_id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("joinedEventRecords");
  await knex.schema.dropTableIfExists("events");
  await knex.schema.dropTableIfExists("exchangeGiftRecords");
  await knex.schema.dropTableIfExists("gifts");
  await knex.schema.dropTableIfExists("earnPointRecords");
  await knex.schema.dropTableIfExists("userRecords");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("admins");
  await knex.schema.dropTableIfExists("projects");
}
