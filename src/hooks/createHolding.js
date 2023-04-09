import { v4 } from "uuid";
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

  const replicateHolding = async (uuid) => {
    try {
      setCreatingRecordStatus(true);
      const database = await getDatabase();
      const holding = await database.investments
        .findOne({
          selector: { uuid },
        })
        .exec();
      await database.investments.insert({
        ...holding._data,
        uuid: v4(),
      });

      message.success("Replicated the investment record successfully");
    } catch (error) {
      message.error("Failed to replicate investment record");
    }

    setCreatingRecordStatus(false);
  };

  return [creatingRecord, createHolding, replicateHolding];
};

export default useCreateHolding;
