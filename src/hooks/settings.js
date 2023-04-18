import { v4 } from "uuid";
import { useState } from "react";
import { getDatabase } from "../database";

const useSettings = () => {
  const [settings, setSettings] = useState({});
  const [fetchingRecord, setFetchingRecordStatus] = useState(false);
  const [updatingRecord, setUpdatingRecordStatus] = useState(false);

  const createUserSettings = async () => {
    try {
      const database = await getDatabase();
      await database.settings.insert({
        uuid: v4(),
        summaryViewSections: {
          distributionGraph: true,
          interestRate: true,
          projectionGraph: true,
          investmentSummary: true,
        },
        investmentProjectionCap: {
          segregatedBarGraph: 10,
          lineGraph: 50,
        },
      });
    } catch (error) {
      //
    }
  };

  const getUserSettings = async () => {
    try {
      setFetchingRecordStatus(true);
      const database = await getDatabase();
      let settings = await database.settings.find().exec();
      if (!settings.length) {
        await createUserSettings();
      }

      settings = await database.settings.find().exec();
      setSettings(settings?.[0]?._data);
    } catch (error) {
      //
    }

    setFetchingRecordStatus(false);
  };

  const updateUserSettings = async (payload) => {
    try {
      setUpdatingRecordStatus(true);
      const database = await getDatabase();

      let settings = await database.settings.find().exec();
      if (!settings.length) {
        await createUserSettings();
      }

      settings = await database.settings.find().exec();
      await settings[0].patch({
        summaryViewSections: {
          ...settings?.[0]?._data?.summaryViewSections,
          ...payload?.summaryViewSections,
        },
        investmentProjectionCap: {
          ...settings?.[0]?._data?.investmentProjectionCap,
          ...payload?.investmentProjectionCap,
        },
      });

      getUserSettings();
    } catch (error) {
      //
    }

    setUpdatingRecordStatus(false);
  };

  return [
    { settings, updatingRecord, fetchingRecord },
    { getUserSettings, updateUserSettings },
  ];
};

export default useSettings;
