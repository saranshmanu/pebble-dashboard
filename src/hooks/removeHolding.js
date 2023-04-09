import { message } from "antd";
import { useState } from "react";
import { getDatabase } from "../database";

const useRemoveHolding = () => {
  const [removingRecord, setRemovingRecordStatus] = useState(false);

  const deleteHolding = async (uuid) => {
    try {
      setRemovingRecordStatus(true);
      const database = await getDatabase();
      let holding = await database.investments
        .findOne({
          selector: { uuid },
        })
        .exec();
      await holding.remove();

      message.success("Removed the investment record!");
    } catch (error) {
      message.error("Failed to remove the investment record");
    }

    setRemovingRecordStatus(false);
  };

  return [removingRecord, deleteHolding];
};

export default useRemoveHolding;
