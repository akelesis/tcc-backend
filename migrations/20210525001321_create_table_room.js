
exports.up = function(knex) {
    return knex.schema.createTable("room", table => {
        table.increments("room_id").primary()
        table.string("name").notNull()
        table.integer("capacity").notNull()
        table.integer("terminals_quantity").notNull()
        table.string("type").notNull()
        table.datetime("created_at").notNull()
        table.datetime("updated_at")
        table.datetime("deleted_at")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("room")
};
