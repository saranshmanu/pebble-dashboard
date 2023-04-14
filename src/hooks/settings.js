import { v4 } from "uuid";
import { useState } from "react";
import { getDatabase } from "../database";

const useSettings = () => {
  const [settings, setSettings] = useState({});

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
      });
    } catch (error) {
      //
    }
  };

  const getUserSettings = async () => {
    try {
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
  };

  const updateUserSettings = async (payload) => {
    try {
      const database = await getDatabase();

      let settings = await database.settings.find().exec();
      if (!settings.length) {
        await createUserSettings();
      }

      settings = await database.settings.find().exec();
      await settings[0].patch({
        summaryViewSections: {
          ...settings?.[0]?._data?.summaryViewSections,
          ...payload,
        },
      });

      getUserSettings();
    } catch (error) {
      //
    }
  };

  return [settings, getUserSettings, updateUserSettings];
};

export default useSettings;
