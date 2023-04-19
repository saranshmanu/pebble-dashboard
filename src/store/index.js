import { init } from "@rematch/core";
import settingsModel from "./models/settings";
import holdingsModel from "./models/holdings";
import institutionsModel from "./models/institutions";
import notificationsModel from "./models/notifications";

const store = init({
  models: {
    settings: settingsModel,
    holdings: holdingsModel,
    institutions: institutionsModel,
    notifications: notificationsModel,
  },
});

export default store;
