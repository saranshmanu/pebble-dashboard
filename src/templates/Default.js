/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Layout, Menu, Typography, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  SettingOutlined,
  TableOutlined,
  BellOutlined,
} from "@ant-design/icons";

import Notifications from "../components/Notifications";
import Logo from "../components/Logo";
import "../styles/Default.scss";

const { Title } = Typography;
const { Header, Sider, Content } = Layout;

const Default = ({ children }) => {
  const sections = {
    1: { title: "Summary" },
    2: { title: "Holdings" },
    3: { title: "Settings" },
  };
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [isNotificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState(sections["1"]?.title);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const collapseButton = React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
    className: "trigger",
    onClick: () => setCollapsed(!collapsed),
  });

  const onNotificationDrawerClose = () => {
    setNotificationDrawerOpen(false);
  };

  const onMenuSelection = (options) => {
    let link = "";
    setPageTitle(sections[options?.key]?.title);
    setSelectedKeys([options?.key]);
    switch (options?.key) {
      case "1":
        link = "/dashboard/summary";
        break;
      case "2":
        link = "/dashboard/holdings";
        break;
      case "3":
        link = "/dashboard/settings";
        break;
    }
    navigate(link);
  };

  useEffect(() => {
    switch (location.pathname.toString()) {
      case "/dashboard/summary":
        setSelectedKeys(["1"]);
        setPageTitle(sections[1]?.title);
        break;
      case "/dashboard/holdings":
        setSelectedKeys(["2"]);
        setPageTitle(sections[2]?.title);
        break;
      case "/dashboard/settings":
        setSelectedKeys(["3"]);
        setPageTitle(sections[3]?.title);
        break;
    }
  }, [location.pathname]);

  return (
    <Layout className="default-layout">
      <Sider className="slider" trigger={null} collapsible collapsed={collapsed}>
        <Logo collapsed={collapsed} />
        <Menu
          theme="dark"
          mode="inline"
          onClick={onMenuSelection}
          selectedKeys={selectedKeys}
          items={[
            { key: "1", icon: <ProjectOutlined />, label: "Summary" },
            { key: "2", icon: <TableOutlined />, label: "Holdings" },
            { key: "3", icon: <SettingOutlined />, label: "Settings" },
          ]}
        />
      </Sider>
      <Layout className="body">
        <Header className="page-header" style={{ background: colorBgContainer }}>
          <div className="page-title-section">
            {collapseButton}
            <Title className="page-title" level={4}>
              {pageTitle}
            </Title>
          </div>
          <div>
            <Notifications open={isNotificationDrawerOpen} onClose={onNotificationDrawerClose} />
            <Button icon={<BellOutlined />} onClick={() => setNotificationDrawerOpen(true)}>
              Notifications
            </Button>
          </div>
        </Header>
        <Content className="page-content" style={{ background: colorBgContainer }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Default;
