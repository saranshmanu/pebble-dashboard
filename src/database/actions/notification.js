import { v4 } from "uuid";
import store from "../../store";
import { getDatabase, initDatabaseInstance } from "..";

const { dispatch } = store;

const getNotifications = async () => {
  try {
    dispatch({ type: "notifications/setFetchStatus", payload: true });

    const database = await getDatabase();
    let response = await database.notification.find().exec();
    response = response.map((data) => {
      const record = data._data;
      return record;
    });

    // Sorts the notifications based on the creation datetime
    response.sort((a, b) => {
      return new Date(b.datetime) - new Date(a.datetime);
    });

    dispatch({ type: "notifications/setNotifications", payload: response });
  } catch (error) {
    //
  }

  dispatch({ type: "notifications/setFetchStatus", payload: false });
};

const clearNotifications = async () => {
  try {
    const database = await getDatabase();
    await database.notification.remove();

    dispatch({ type: "notifications/setNotifications", payload: [] });
    await initDatabaseInstance();
  } catch (error) {}
};

const createNotification = async (notification = "", type = "") => {
  try {
    if (notification === "" || !notification) return;

    const database = await getDatabase();
    const payload = {
      type,
      uuid: v4(),
      notification,
      datetime: new Date().toISOString(),
    };
    await database.notification.insert(payload);

    dispatch({ type: "notifications/createNotification", payload });
  } catch (error) {}
};

export { createNotification, getNotifications, clearNotifications };
