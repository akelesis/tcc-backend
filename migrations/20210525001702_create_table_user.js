
exports.up = function(knex) {
    return knex.schema.createTable("user", table => {
      table.increments("user_id").primary()
      table.string("email").notNull()
      table.string("password").notNull()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user")
};
