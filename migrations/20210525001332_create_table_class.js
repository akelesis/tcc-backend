
exports.up = function(knex) {
    return knex.schema.createTable("class", table => {
        table.increments('class_id').notNull()
        table.string("college_semester").notNull()
        table.string("description").notNull()
        table.integer("subject_id").unsigned().notNull()
        table.foreign("subject_id").references("subject_id").inTable("subject")
        table.datetime("created_at").notNull()
        table.datetime("updated_at")
        table.datetime("deleted_at")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("class")
};
