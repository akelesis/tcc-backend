
exports.up = function(knex) {
    return knex.schema.createTable("subject", table => {
        table.increments("subject_id").primary()
        table.string("name").notNull()
        table.string("semester").notNull()
        table.integer("workload").notNull()
        table.integer("credits").notNull()
        table.string("subject_code").notNull()
        table.dateTime("created_at").notNull()
        table.dateTime("updated_at")
        table.dateTime("deleted_at")

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('subject')
};
