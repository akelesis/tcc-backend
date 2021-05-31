const knex = require('../config/db')

const migrate = () => {
   return knex.migrate.latest()
}

const rollback = () => {
    return knex.migrate.rollback()
}

const destroy = () => {
    return knex.destroy()
}

module.exports = {migrate, rollback, destroy}