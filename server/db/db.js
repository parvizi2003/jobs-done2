const PG = require("pg");

const pool = new PG.Pool({
    user: 'postgres',
    password: 'qwerty',
    host: 'localhost',
    port: 5432,
    database: "jobs-done_development"
});

module.exports = pool;