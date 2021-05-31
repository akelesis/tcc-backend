
exports.up = function(knex) {
  return knex.schema.createTable("professor", table => {
      table.increments("professor_id").primary()
      table.string("name").notNull()
      table.string("department").notNull()
      table.string("email").notNull()
      table.datetime("created_at").notNull()
      table.datetime("updated_at")
      table.datetime("deleted_at")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("professor")
};
