import pg from "pg";

const connectionString = process.env.POSTGRE_URL;

const db = new pg.Pool({
  connectionString,
});

db.connect();

export default db;
