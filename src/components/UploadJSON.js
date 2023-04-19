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
    // Reads the file and extracts the text
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsText(file);
  };

  const beforeUpload = (file) => {
    // Checks if the file is in JSON format
    const isJSON = file.type === "application/json";
    if (!isJSON) {
      message.error("You can only upload JSON file!");
      return true;
    }

    // Checks if the size of the file is less than 1MB
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("File size must smaller than 1MB!");
      return true;
    }

    // The file is valid
    setFile(file);
    return false;
  };

  const onUpload = () => {
    if (!file) {
      message.error("Selection is not valid");
      return;
    }
    getJSON(file, (json) => {
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
        onRemove={() => {
          // Removes the selected file if any
          setFile();
        }}
        maxCount={1}
        multiple={false}
        listType="picture"
        beforeUpload={beforeUpload}
        showUploadList={true}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Modal>
  );
};

export default UploadJSON;
