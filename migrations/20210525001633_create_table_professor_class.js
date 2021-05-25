
exports.up = function(knex) {
    return knex.schema.createTable("professor_class", table => {
        table.increments('professor_class_id').primary()
        table.integer('professor_id').unsigned().notNull()
        table.integer('class_id').unsigned().notNull()
        table.foreign('professor_id').references('professor_id').inTable('professor')
        table.foreign('class_id').references('class_id').inTable('class')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('professor_class')
};
