import { init } from "@rematch/core";
import settingsModel from "./settings";

const store = init({ models: { settings: settingsModel } });

export default store;
