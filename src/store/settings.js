const settingsModel = {
  state: {
    darkMode: window.localStorage.getItem("dark-mode-status") === "true",
  },
  reducers: {
    switchMode(state, payload = {}) {
      window.localStorage.setItem("dark-mode-status", !state?.darkMode);
      return {
        ...state,
        darkMode: !state?.darkMode,
      };
    },
  },
};

export default settingsModel;
