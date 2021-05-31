const knex = require('../config/db')


async function createDatabase() {
  const dbConnection = knex;

  try {
    await dbConnection.raw('CREATE DATABASE cronos_teste');
  } catch (err) {
    console.log(err);
  } finally {
    await dbConnection.destroy();
  }
}

module.exports = async () => {
  await createDatabase();
};