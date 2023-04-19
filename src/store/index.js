import { init } from "@rematch/core";
import settingsModel from "./settings";
import notificationsModel from "./notifications";

const store = init({
  models: {
    settings: settingsModel,
    notifications: notificationsModel,
  },
});

export default store;
