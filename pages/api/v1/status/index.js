import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const versionResult = await database.query("SHOW server_version;")
  const versionValue = versionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections;")
  const maxConnectionsValue = parseInt(maxConnectionsResult.rows[0].max_connections)
  const dataBaseName = process.env.POSTGRES_DB;
  const connectionsUsed = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values:[dataBaseName]
  })
  const connectionsUsedValue = connectionsUsed.rows[0].count
  
  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      version: versionValue,
      max_connections: maxConnectionsValue,
      connections_used: connectionsUsedValue
    }
  })
}

export default status;
