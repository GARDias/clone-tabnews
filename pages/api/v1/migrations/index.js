import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";
export default async function migrations(request, response) {
  console.log(request.method === "POST" ? "Entrou no POST" : "Entrou no GET");
  const dbClient = await database.getNewClient();
  const defaultConfig = {
    dbClient: dbClient,
    dryRun: true,
    migrationsTable: "pgmigrations",
    verbose: true,
    dir: join("infra", "migrations"),
    direction: "up",
  };

  if (request.method === "GET") {
    const beforeMigrated = await migrationRunner(defaultConfig);
    await dbClient.end();
    return response.status(200).json(beforeMigrated);
  }

  if (request.method === "POST") {
    const afterMigrated = await migrationRunner({
      ...defaultConfig,
      dryRun: false,
    });
    await dbClient.end();
    if (afterMigrated.length > 0) {
      return response.status(201).json(afterMigrated);
    }
    return response.status(200).json(afterMigrated);
  }
}
