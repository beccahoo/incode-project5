//importing pg-promise
const pgp = require("pg-promise")();

//creating connection string
const connection = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const db = pgp(connection);
console.log("Database Connected")

module.exports = db;
