
exports.up = function(knex) {
    return knex.schema.createTable("class", table => {
        table.increments("id").primary()
        table.integer("id_subject").references('id').inTable('subject')
        table.integer("id_professor").references('id').inTable('professor')
        table.integer("id_room").references('id').inTable('room')
        table.integer("id_time").references('id').inTable('time')
        table.string('period').notNull()
        table.dateTime("created_at").notNull()
        table.dateTime('updated_at')
        table.dateTime("deleted_at")
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("class")
};
