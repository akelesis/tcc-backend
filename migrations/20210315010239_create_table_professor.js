
exports.up = function (knex) {
  return knex.schema.createTable("professor", table => {
    table.increments("id").primary()
    table.string("name").notNull()
    table.string("department").notNull()
    table.integer("workload").nullable()
    table.dateTime("created_at").notNull()
    table.dateTime('updated_at')
    table.dateTime("deleted_at")
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("professor")
};
