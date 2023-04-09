import { useState } from "react";
import { message } from "antd";
import { getDatabase } from "../database";

const useCreateHolding = () => {
  const [creatingRecord, setCreatingRecordStatus] = useState(false);

  const createHolding = async (payload) => {
    try {
      setCreatingRecordStatus(true);
      const database = await getDatabase();
      await database.investments.insert(payload);

      message.success("Created the investment record successfully");
    } catch (error) {
      message.error("Failed to create investment record");
    }

    setCreatingRecordStatus(false);
  };

  return [creatingRecord, createHolding];
};

export default useCreateHolding;
