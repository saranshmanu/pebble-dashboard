import { useState } from "react";
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
import InstitutionForm from "./InstitutionForm";
import { clearCache, exportDatabase } from "../../database";
import Report from "../Report";

const { confirm } = Modal;

const General = () => {
  const [isInstitutionModalOpen, setInstitutionModalOpen] = useState(false);

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

  const clearSystemCache = () => {
    confirm({
      title: "Are you sure you want to clear the system cache?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        clearCache();
      },
      onCancel: () => {},
    });
  };

  const exportDatabaseData = () => {
    confirm({
      title: "Are you sure you want to export the database?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const data = await exportDatabase();
        const href = URL.createObjectURL(
          new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
          })
        );

        const link = document.createElement("a");
        link.download = "pebble-database.json";
        link.href = href;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      },
      onCancel: () => {},
    });
  };

  return (
    <Space direction="vertical" size={0} className="full-width">
      <div>
        <Button type="link" size="large" icon={<FolderAddOutlined />}>
          Import Holdings
        </Button>
      </div>
      <div>
        <InstitutionForm
          isOpen={isInstitutionModalOpen}
          onClose={() => {
            setInstitutionModalOpen(false);
          }}
        />
        <Button type="link" size="large" icon={<UsergroupAddOutlined />} onClick={() => setInstitutionModalOpen(true)}>
          Create Institution
        </Button>
      </div>
      <div>
        <Button type="link" size="large" icon={<FireOutlined />} onClick={clearSystemCache}>
          Format Cache
        </Button>
      </div>
      <div>
        <Report>
          <Button type="link" size="large" icon={<FilePdfOutlined />}>
            Generate Holding Report
          </Button>
        </Report>
      </div>
      <div>
        <Button type="link" size="large" icon={<ExportOutlined />} onClick={exportDatabaseData}>
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
