import { init } from "@rematch/core";
import settingsModel from "./settings";
import institutionsModel from "./institutions";
import notificationsModel from "./notifications";

const store = init({
  models: {
    settings: settingsModel,
    institutions: institutionsModel,
    notifications: notificationsModel,
  },
});

export default store;
