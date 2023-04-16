import { createRxDatabase, addRxPlugin } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import investmentTable from "./investment";
import notificationTable from "./notification";
import settingTable from "./setting";
import institutionTable from "./institution";
import { createNotification } from "../utils/commonFunctions";

const createDatabase = async () => {
  // Migration instructions
  // https://rxdb.info/questions-answers.html#cant-change-the-schema
  addRxPlugin(RxDBMigrationPlugin);
  addRxPlugin(RxDBJsonDumpPlugin);

  window.database = await createRxDatabase({
    name: "pebble-database",
    storage: getRxStorageDexie(),
    ignoreDuplicate: true,
  });

  await window.database.addCollections({
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
    notification: {
      schema: notificationTable,
      migrationStrategies: {
        1: (document) => {
          return document;
        },
      },
    },
  });
};

const initDatabaseInstance = async () => {
  await createDatabase();
};

const getDatabase = async () => {
  return window.database;
};

const clearCache = async () => {
  try {
    const database = await getDatabase();
    await database.institution.remove();
    await database.investments.remove();
    await database.notification.remove();

    createNotification("Cleared the system cache!", "info");
  } catch (error) {
    createNotification("Failed to clear the system cache!", "error");
    console.error("Failed to clear cache", error);
  }
};

const exportDatabase = async () => {
  const database = await getDatabase();
  const data = await database.exportJSON();
  return data;
};

export { createDatabase, getDatabase, clearCache, initDatabaseInstance, exportDatabase };
