import { init } from "@rematch/core";
import settingsModel from "./settings";
import holdingsModel from "./holdings";
import institutionsModel from "./institutions";
import notificationsModel from "./notifications";

const store = init({
  models: {
    settings: settingsModel,
    holdings: holdingsModel,
    institutions: institutionsModel,
    notifications: notificationsModel,
  },
});

export default store;
