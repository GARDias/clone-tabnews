import { Client } from "pg";
async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTEGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
  });
  await client.connect();

  const res = await client.query(queryObject);
  console.log(res.rows[0].message); // é para aparecer o deu certo!
  await client.end();
  return res;
}

export default {
  query: query,
};
