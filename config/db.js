const config = require("../knexfile");
const env = process.env.NODE_ENV || "production"
const knex = require("knex")(config[env]);

if(env !== 'test') knex.migrate.latest([config[env]]);

module.exports = knex;