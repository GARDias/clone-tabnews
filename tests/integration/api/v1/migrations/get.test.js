import database from "infra/database";

beforeAll(clearDatabase);
async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  console.log(process.env.NODE_ENV);
  const version = await database.query("SHOW server_version;");
  console.log(version.rows[0].server_version);
});
