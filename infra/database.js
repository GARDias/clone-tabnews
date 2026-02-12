import { Client } from "pg";
async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const res = await client.query(queryObject);
    console.log(
      res.rows === undefined ? "Retornou undefined" : res.rows[0].message,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production" ? process.env.SSLMODE : "",
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};
