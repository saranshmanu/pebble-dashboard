import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import investmentTable from "./investment";

let database;

const createDatabase = async () => {
  database = await createRxDatabase({
    name: "pebble-database",
    storage: getRxStorageDexie(),
  });

  await database.addCollections({
    investments: {
      schema: investmentTable,
    },
  });
};

const getDatabase = async () => {
  if (!database) {
    await createDatabase();
  }
  return database;
};
export { createDatabase, getDatabase };
