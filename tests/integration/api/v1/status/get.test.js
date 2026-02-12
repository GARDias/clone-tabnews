test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();

  const parsedupdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedupdateAt);

  expect(responseBody.dependencies.version).toEqual("16.11");
  expect(responseBody.dependencies.max_connections).toEqual(100);
  expect(responseBody.dependencies.connections_used).toEqual(1);
});
