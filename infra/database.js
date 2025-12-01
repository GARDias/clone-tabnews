import { Client } from "pg";
async function query(queryObject) {
  const client = new Client({
    user: "postgres",
    password: "Console.log0",
    host: "localhost",
    port: "5432",
    database: "postgres",
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
