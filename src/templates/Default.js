/* eslint-disable default-case */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Typography, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  SettingOutlined,
  TableOutlined,
} from "@ant-design/icons";

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
  const [pageTitle, setPageTitle] = useState(sections["1"]?.title);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const collapseButton = React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
    className: "trigger",
    onClick: () => setCollapsed(!collapsed),
  });

  const onMenuSelection = (options) => {
    setPageTitle(sections[options?.key]?.title);
    let link = "";
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

  return (
    <Layout className="default-layout">
      <Sider className="slider" trigger={null} collapsible collapsed={collapsed}>
        <Logo collapsed={collapsed} />
        <Menu
          theme="dark"
          mode="inline"
          onClick={onMenuSelection}
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", icon: <AppstoreOutlined />, label: "Summary" },
            { key: "2", icon: <TableOutlined />, label: "Holdings" },
            { key: "3", icon: <SettingOutlined />, label: "Settings" },
          ]}
        />
      </Sider>
      <Layout className="body">
        <Header className="page-header" style={{ background: colorBgContainer }}>
          {collapseButton}
          <Title className="page-title" level={4}>
            {pageTitle}
          </Title>
        </Header>
        <Content className="page-content" style={{ background: colorBgContainer }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Default;
