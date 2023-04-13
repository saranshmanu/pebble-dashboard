import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import investmentTable from "./investment";
import settingTable from "./setting";

let database;

const createDatabase = async () => {
  database = await createRxDatabase({
    name: "pebble-database",
    storage: getRxStorageDexie(),
    ignoreDuplicate: true,
  });

  await database.addCollections({
    investments: {
      schema: investmentTable,
    },
    settings: {
      schema: settingTable,
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
