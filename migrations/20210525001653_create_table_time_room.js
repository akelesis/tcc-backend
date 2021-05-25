
exports.up = function(knex) {
    return knex.schema.createTable("time_room", table => {
        table.increments('time_room_id').primary()
        table.string('day').notNull()
        table.string('time').notNull()
        table.integer('class_id').unsigned().notNull()
        table.integer('room_id').unsigned().notNull()
        table.foreign('class_id').references('class_id').inTable('class')
        table.foreign('room_id').references('room_id').inTable('room')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('time_room')
};
