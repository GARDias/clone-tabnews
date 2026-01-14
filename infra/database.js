import { Client } from "pg";
async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTEGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
  });
  try{
    await client.connect();
    const res = await client.query(queryObject);
    console.log(res.rows[0].message);
    return res ;
  } catch(err) {
    console.error(err);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
