import { useState } from "react";
import { Row, Col, Menu, Typography, Divider } from "antd";
import { LayoutOutlined, ControlOutlined, BarsOutlined } from "@ant-design/icons";
import General from "../components/settings/General";
import Institution from "../components/settings/Institution";
import Preference from "../components/settings/Preference";
import "../styles/Settings.scss";

const { Title } = Typography;

function Setting() {
  const sections = [
    {
      label: "General",
      icon: ControlOutlined,
      view: General,
    },
    {
      label: "Institutions",
      icon: BarsOutlined,
      view: Institution,
    },
    {
      label: "Preferences",
      icon: LayoutOutlined,
      view: Preference,
    },
  ];

  const [selectedSection, setselectedSection] = useState(sections[0]);
  const [selectedKeys, setSelectedKeys] = useState(["0"]);

  const onMenuSelection = (option) => {
    setSelectedKeys(option?.key);
    const key = option?.key;
    switch (key) {
      case "0":
        setselectedSection(sections[0]);
        break;
      case "1":
        setselectedSection(sections[1]);
        break;
      case "2":
        setselectedSection(sections[2]);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Row className="full-height" gutter={[10, 10]}>
        <Col span={6}>
          <div className="full-height">
            <Menu
              className="full-height full-width"
              selectedKeys={selectedKeys}
              onClick={onMenuSelection}
              defaultSelectedKeys={["general"]}
              defaultOpenKeys={["general"]}
              mode="vertical"
              theme="light"
              items={[
                { key: "0", icon: <ControlOutlined />, label: "General" },
                { key: "1", icon: <BarsOutlined />, label: "Institutions" },
                { key: "2", icon: <LayoutOutlined />, label: "Preferences" },
              ]}
            />
          </div>
        </Col>
        <Col span={18}>
          <div className="section">
            <Title level={2}>
              <selectedSection.icon className="section-illustration" />
              {selectedSection?.label}
            </Title>
            <Divider />
            <selectedSection.view />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Setting;
