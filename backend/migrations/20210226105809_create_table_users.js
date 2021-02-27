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
    table.integer("level").notNull().defaultTo(0);
    table.integer("current_experience").notNull().defaultTo(0);
    table.integer("challenges_completed").notNull().defaultTo(0);
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
