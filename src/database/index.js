import { createRxDatabase, addRxPlugin } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import investmentTable from "./investment";
import notificationTable from "./notification";
import settingTable from "./setting";
import institutionTable from "./institution";
import { createNotification } from "../utils/commonFunctions";
import useHolding from "../hooks/holding";

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
      migrationStrategies: {
        1: (document) => {
          return {
            ...document,
            investmentProjectionCap: {
              segregatedBarGraph: 10,
              lineGraph: 50,
            },
          };
        },
      },
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ refresh }] = useHolding();
    const database = await getDatabase();
    await database.institution.remove();
    await database.investments.remove();
    await database.notification.remove();
    await database.settings.remove();

    await initDatabaseInstance();
    refresh();

    createNotification("Cleared the system cache!", "info");
  } catch (error) {
    createNotification("Failed to clear the system cache!", "error");
    console.error("Failed to clear cache", error);
  }
};

const exportDatabase = async () => {
  try {
    const database = await getDatabase();
    const data = await database.exportJSON();

    createNotification("Generated a snapshot of the database!", "info");
    return data;
  } catch (error) {
    createNotification("Failed to generate a snapshot of the database.", "info");
  }
};

const importDatabase = async (json = {}) => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ refresh }] = useHolding();
    const database = await getDatabase();
    await database.importJSON(json);
    refresh();

    createNotification("Imported the snapshot JSON to the database!", "info");
  } catch (error) {
    console.log(error);
    createNotification("Failed to import the JSON dump!", "error");
  }
};

export { createDatabase, getDatabase, clearCache, initDatabaseInstance, exportDatabase, importDatabase };
