const notificationsModel = {
  state: {
    fetchingNotifications: false,
    notifications: [],
  },
  reducers: {
    createNotification(state, payload = {}) {
      return { ...state, notifications: [payload, ...state.notifications] };
    },
    setNotifications(state, payload = []) {
      return { ...state, notifications: payload };
    },
    setFetchStatus(state, payload = false) {
      return { ...state, fetchingNotifications: payload };
    },
  },
};

export default notificationsModel;
