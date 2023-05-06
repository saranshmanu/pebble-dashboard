import { createRxDatabase, addRxPlugin } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";

import settingTable from "./schemas/setting";
import equityInvestmentTable from "./schemas/equityInvestment";
import employeeProvidentFundTable from "./schemas/employeeProvidentFund";
import fixedIncomeInvestmentTable from "./schemas/fixedIncomeInvestment";
import institutionTable from "./schemas/institution";
import notificationTable from "./schemas/notification";

import { createNotification } from "../utils/commonFunctions";

import { getHoldings, getEquityHoldings } from "./actions/holding";
import { getInstitutions } from "./actions/institution";
import { getNotifications } from "./actions/notification";

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
      schema: fixedIncomeInvestmentTable,
      migrationStrategies: {
        4: (document) => {
          return { ...document };
        },
      },
    },
    equityInvestments: {
      schema: equityInvestmentTable,
      migrationStrategies: {
        4: (document) => {
          return document;
        },
      },
    },
    employeeProvidentFund: {
      schema: employeeProvidentFundTable,
      migrationStrategies: {
        2: (document) => {
          return { ...document };
        },
      },
    },
    settings: {
      schema: settingTable,
      migrationStrategies: {
        2: (document) => {
          return { ...document };
        },
      },
    },
    institution: {
      schema: institutionTable,
      migrationStrategies: {
        3: (document) => {
          return { ...document };
        },
      },
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

const refreshStore = async () => {
  await getNotifications();
  await getInstitutions();
  await getEquityHoldings();
  await getHoldings();
};

const clearCache = async () => {
  try {
    const database = await getDatabase();
    await database.institution.remove();
    await database.investments.remove();
    await database.employeeProvidentFund.remove();
    await database.equityInvestments.remove();
    await database.notification.remove();
    await database.settings.remove();

    await initDatabaseInstance();
    refreshStore();

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
    const database = await getDatabase();
    await database.importJSON(json);
    refreshStore();

    createNotification("Imported the snapshot JSON to the database!", "info");
  } catch (error) {
    createNotification("Failed to import the JSON dump!", "error");
  }
};

export { createDatabase, getDatabase, clearCache, initDatabaseInstance, exportDatabase, importDatabase };
