import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("admins").del();
  await knex("projects").del();

  const today = new Date();
  // Inserts seed entries
  const [tpzy, ndvg, hksun, sumyee] = await knex("projects")
    .insert([
      { project_id: "推普之友", project_name: "Tui Pu Zhi You", date_add: today },
      { project_id: "新界北義工團", project_name: "NDVG", date_add: today },
      {
        project_id: "香港青年陽光力量",
        project_name: "HK Sun Power of Teens",
        date_add: today,
      },
      { project_id: "心意習", project_name: "Sum Yee", date_add: today },
    ])
    .returning("project_id");

  await knex("admins").insert([
    {
      user_id: "000000",
      username: "manager",
      password: "123456",
      isVolunteer: true,
      isAdmin: true,
      isManager: true,
    },
    {
      user_id: "000001",
      username: "tpzy01",
      password: "123456",
      isVolunteer: true,
      project_id: tpzy.project_id,
    },
    {
      user_id: "000002",
      username: "tpzy02",
      password: "123456",
      isVolunteer: true,
      project_id: tpzy.project_id,
    },
    {
      user_id: "000003",
      username: "ndvg01",
      password: "123456",
      isVolunteer: true,
      project_id: ndvg.project_id,
    },
    {
      user_id: "000004",
      username: "ndvg02",
      password: "123456",
      isVolunteer: true,
      project_id: ndvg.project_id,
    },
    {
      user_id: "000005",
      username: "hksun01",
      password: "123456",
      isVolunteer: true,
      project_id: hksun.project_id,
    },
    {
      user_id: "000006",
      username: "hksun02",
      password: "123456",
      isVolunteer: true,
      project_id: hksun.project_id,
    },
    {
      user_id: "000007",
      username: "sumyee01",
      password: "123456",
      isVolunteer: true,
      project_id: sumyee.project_id,
    },
    {
      user_id: "000008",
      username: "sumyee02",
      password: "123456",
      isVolunteer: true,
      project_id: sumyee.project_id,
    },
    {
      user_id: "000009",
      username: "admin_tpzy",
      password: "123456",
      isVolunteer: true,
      isAdmin: true,
      project_id: tpzy.project_id,
    },
    {
      user_id: "000010",
      username: "admin_ndvg",
      password: "123456",
      isVolunteer: true,
      isAdmin: true,
      project_id: ndvg.project_id,
    },
    {
      user_id: "000011",
      username: "admin_hksun",
      password: "123456",
      isVolunteer: true,
      isAdmin: true,
      project_id: hksun.project_id,
    },
    {
      user_id: "000012",
      username: "admin_sumyee",
      password: "123456",
      isVolunteer: true,
      isAdmin: true,
      project_id: sumyee.project_id,
    },
  ]);
}
