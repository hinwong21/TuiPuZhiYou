# TuiPuZhiYou

drop db migration record (if found migration directory is corrupt(missing file))
drop table knex_migrations;
drop table knex_migrations_lock;

npx knex migrate:down
npx knex migrate:latest
npx knex seed:run