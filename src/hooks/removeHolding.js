import { Modal, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { getDatabase } from "../database";
import { useState } from "react";

const { confirm } = Modal;

const useRemoveHolding = () => {
  const [removingRecord, setRemovingRecordStatus] = useState(false);
  let uuid = "";

  const removeHoldingRecord = async () => {
    try {
      const database = await getDatabase();
      let holding = await database.investments
        .findOne({
          selector: {
            uuid,
          },
        })
        .exec();
      await holding.remove();

      message.success("Removed the investment record!");
    } catch (error) {
      message.error("Failed to remove the investment record");
    }

    setRemovingRecordStatus(false);
  };

  const deleteHolding = async (identifier) => {
    setRemovingRecordStatus(true);
    uuid = identifier;

    confirm({
      title: "Are you sure you want to delete the investment record?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeHoldingRecord();
      },
      onCancel() {
        setRemovingRecordStatus(false);
      },
    });
  };

  return [removingRecord, deleteHolding];
};
export default useRemoveHolding;
