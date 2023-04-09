import { message } from "antd";
import { useState } from "react";
import { getDatabase } from "../database";

const useUpdateHolding = () => {
  const [updatingRecord, setUpdatingRecordStatus] = useState(false);

  const updateHolding = async (uuid, payload) => {
    try {
      setUpdatingRecordStatus(true);
      const database = await getDatabase();
      let holding = await database.investments
        .findOne({
          selector: { uuid },
        })
        .exec();
      delete payload.uuid;
      await holding.patch({ ...payload });

      message.success("Updated the investment record!");
    } catch (error) {
      message.error("Failed to update the investment record");
    }

    setUpdatingRecordStatus(false);
  };

  return [updatingRecord, updateHolding];
};

export default useUpdateHolding;
