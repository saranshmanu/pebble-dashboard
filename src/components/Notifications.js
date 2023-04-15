/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useEffect } from "react";
import { Divider, Drawer, Typography, Space, Tag, Button } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const Notification = ({ notification = {} }) => {
  const getNotificationType = (type = "") => {
    switch (type) {
      case "error":
        return {
          icon: <CloseCircleOutlined />,
          color: "red",
          children: "Error",
        };
      case "success":
        return {
          icon: <CheckCircleOutlined />,
          color: "green",
          children: "Success",
        };
      case "info":
        return {
          icon: <ExclamationCircleOutlined />,
          color: "blue",
          children: "Info",
        };
      default:
        return {
          icon: <CheckCircleOutlined />,
          color: "cyan",
          children: "Success",
        };
    }
  };

  const formatDateTime = (datetime) => {
    if (!datetime) return null;
    return dayjs(datetime).format(" MMMM D, YYYY H:mm A");
  };

  return (
    <Space direction="vertical" size={2}>
      <Text strong ellipsis>
        {notification?.notification}
      </Text>
      <Space direction="horizontal" size={1}>
        <Tag bordered={false} {...getNotificationType(notification?.type)} />
        <Text type="secondary">
          <ClockCircleOutlined style={{ fontSize: "12px" }} />
          {formatDateTime(notification?.datetime)}
        </Text>
      </Space>
      <Divider className="divider" />
    </Space>
  );
};

const Notifications = ({ notifications, open, onClose, getNotifications, clearNotifications }) => {
  useEffect(() => {
    if (open) {
      // fetch the notifications from the database
      getNotifications();
    }
  }, [open]);

  return (
    <Drawer
      className="notification-section"
      title="Notifications"
      placement="right"
      open={open}
      onClose={onClose}
      extra={
        <Button
          onClick={() => {
            clearNotifications();
            onClose();
          }}
          type="link"
        >
          Clear Notifications
        </Button>
      }
    >
      {notifications.map((notification, index) => (
        <Notification key={index} notification={notification} />
      ))}
    </Drawer>
  );
};

export default Notifications;
