exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("image").notNull();
    table.string("email").notNull().unique();
    table.string("password").notNull();
    table.string("reset_password");
    table.boolean("admin").notNull().defaultTo(false);
    table.boolean("active").notNull().defaultTo(true);
    table.string("last_login");
    table.dateTime("created_at")
      .notNull()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.string("deleted_at");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
