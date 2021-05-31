const knex = require('../config/db')

async function deleteDatabase() {
  const dbConnection = knex

  try {
    await dbConnection.raw('DROP DATABASE IF EXISTS cronos_teste');
  } catch (err) {
    console.log(err);
  } finally {
    await dbConnection.destroy();
  }
}

module.exports = async () => {
  await deleteDatabase();
};