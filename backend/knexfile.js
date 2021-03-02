const { myDB, userDB, passDB } = require("./.env");

module.exports = {
  client: "mysql2",
  connection: {
    database: myDB,
    user: userDB,
    password: passDB,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
