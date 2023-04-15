import { createRxDatabase, addRxPlugin } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import investmentTable from "./investment";
import settingTable from "./setting";
import institutionTable from "./institution";
import { message } from "antd";

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
      migrationStrategies: {
        1: (document) => {
          return document;
        },
        2: (document) => {
          return document;
        },
        3: (document) => {
          return { ...document, institution: document?.institutionIdentifier };
        },
      },
    },
    settings: {
      schema: settingTable,
    },
    institution: {
      schema: institutionTable,
    },
  });
};

const getDatabase = async () => {
  if (!database) {
    // Migration instructions
    // https://rxdb.info/questions-answers.html#cant-change-the-schema
    addRxPlugin(RxDBMigrationPlugin);
    await createDatabase();
  }
  return database;
};

const clearCache = async () => {
  try {
    const database = await getDatabase();
    await database.institution.remove();
    await database.investments.remove();

    message.info("Cleared the system cache!");
  } catch (error) {
    console.error("Failed to clear cache", error);
    message.error("Failed to clear the system cache!");
  }
};

export { createDatabase, getDatabase, clearCache };
