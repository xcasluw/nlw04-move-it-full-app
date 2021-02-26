exports.up = function (knex, Promise) {
  return knex.schema.createTable("exceptions", (table) => {
    table.increments("id").primary();
    table.string("description").notNull();
    table.dateTime("created_at")
      .notNull()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("exceptions");
};
