
exports.up = function(knex) {
    return knex.schema.createTable("room", table => {
        table.increments("id").primary()
        table.string("name").notNull()
        table.integer("capacity").notNull()
        table.string("type").notNull()
        table.dateTime("created_at").notNull()
        table.dateTime('updated_at')
        table.dateTime("deleted_at")
    })
};

exports.down = function(knex) {
  knex.schema.dropTable("room")
};
