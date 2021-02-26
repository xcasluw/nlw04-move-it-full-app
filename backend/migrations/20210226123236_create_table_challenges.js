exports.up = function (knex, Promise) {
  return knex.schema.createTable("challenges", (table) => {
    table.increments("id").primary();
    table.string("type").notNull();
    table.text("description").notNull();
    table.integer("amount").notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("challenges");
};
