import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://lucasbole:lucasbole@mymongodb.ictrymk.mongodb.net/";

const client = new MongoClient(connectionString);

let conn;
try {
  // Try
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("austral");

export default db;
