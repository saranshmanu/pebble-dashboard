import { useState } from "react";
import { getDatabase } from "../database";

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

      setNotifications(response.reverse());
    } catch (error) {
      //
    }

    setFetchingRecordStatus(false);
  };

  return [{ notifications, fetchingRecord }, { getNotifications }];
};

export default useNotification;
