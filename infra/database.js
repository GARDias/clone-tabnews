import { Client } from "pg";
async function query(queryObject) {
  const client = new Client( process.env.DATABASE_URL);
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
