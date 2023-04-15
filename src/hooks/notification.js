import { useState } from "react";
import { getDatabase, initDatabaseInstance } from "../database";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [fetchingRecord, setFetchingRecordStatus] = useState(false);

  const getNotifications = async () => {
    try {
      setFetchingRecordStatus(true);

      const database = await getDatabase();
      if (!database.notification) {
        console.warn("Database instance cannot be found");
        return;
      }

      let response = await database.notification.find().exec();
      response = response.map((data) => {
        const record = data._data;
        return record;
      });

      // Sorts the notifications based on the creation datetime
      response.sort((a, b) => {
        return new Date(b.datetime) - new Date(a.datetime);
      });

      setNotifications(response);
    } catch (error) {
      //
    }

    setFetchingRecordStatus(false);
  };

  const clearNotifications = async () => {
    try {
      const database = await getDatabase();
      await database.notification.remove();
      await initDatabaseInstance();
    } catch (error) {}

    getNotifications();
  };

  return [
    { notifications, fetchingRecord },
    { getNotifications, clearNotifications },
  ];
};

export default useNotification;
