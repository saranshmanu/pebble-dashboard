import { Button, Divider } from "antd";
import {
  UsergroupAddOutlined,
  FireOutlined,
  CloseCircleOutlined,
  ExportOutlined,
  FolderAddOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

const General = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
        <Button type="link" size="large" icon={<CloseCircleOutlined />} danger>
          Close Application
        </Button>
      </div>
      <Divider />
    </div>
  );
};

export default General;
