import knex = require('knex');

/**
 * Conection to mysql raylway
 */

export const databaseConnection = knex({
  client: 'mysql2',
  connection: {
    host: process.env.RAILWAY_MYSQL_HOST,
    port: process.env.RAILWAY_MYSQL_PORT
      ? parseInt(process.env.RAILWAY_MYSQL_PORT)
      : undefined,
    user: process.env.RAILWAY_MYSQL_USER,
    password: process.env.RAILWAY_MYSQL_PASSWORD,
    database: process.env.RAILWAY_MYSQL_DATABASE
  }
});
