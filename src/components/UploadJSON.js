import { useState } from "react";
import { Modal, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { importDatabase } from "../database";

const UploadJSON = ({ isModalOpen, onFormCancel }) => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const onModalClose = () => {
    // Remove the selected file
    setFile();

    // Close the modal
    onFormCancel();
  };

  const handleChange = (info) => {
    setFile(info.file);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      return;
    }
  };

  const getJSON = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsText(file);
  };

  const onUpload = () => {
    const isJSON = file.type === "application/json";
    if (!isJSON) {
      message.error("You can only upload JSON file!");
      return;
    }

    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error("File size must smaller than 1MB!");
      return;
    }

    getJSON(file.originFileObj, (json) => {
      importDatabase(JSON.parse(json));
      onModalClose();
    });
  };

  return (
    <Modal
      size="small"
      okText="Upload"
      open={isModalOpen}
      onCancel={onModalClose}
      onOk={onUpload}
      title="Database Snapshot"
      width={"400px"}
    >
      <Upload
        fileList={file ? [file] : []}
        maxCount={1}
        multiple={false}
        listType="picture"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        showUploadList={true}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Modal>
  );
};

export default UploadJSON;
