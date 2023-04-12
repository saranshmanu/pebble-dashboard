import { Button, Divider, Space, Modal } from "antd";
import {
  UsergroupAddOutlined,
  FireOutlined,
  CloseCircleOutlined,
  ExportOutlined,
  FolderAddOutlined,
  FilePdfOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

const { confirm } = Modal;

const General = () => {
  const closeApplication = () => {
    confirm({
      title: "Are you sure you want to close the application?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.send("close", []);
      },
      onCancel: () => {},
    });
  };

  return (
    <Space direction="vertical" size={0}>
      <div>
        <Button type="link" size="large" icon={<FolderAddOutlined />}>
          Import Holdings
        </Button>
      </div>
      <div>
        <Button type="link" size="large" icon={<UsergroupAddOutlined />}>
          Create Institution
        </Button>
      </div>
      <div>
        <Button type="link" size="large" icon={<FireOutlined />}>
          Format Cache
        </Button>
      </div>
      <div>
        <Button type="link" size="large" icon={<FilePdfOutlined />}>
          Generate Holding Report
        </Button>
      </div>
      <div>
        <Button type="link" size="large" icon={<ExportOutlined />}>
          Export Data (in JSON format)
        </Button>
      </div>
      <Divider />
      <div>
        <Button type="link" size="large" icon={<CloseCircleOutlined />} danger onClick={closeApplication}>
          Close Application
        </Button>
      </div>
      <Divider />
    </Space>
  );
};

export default General;
