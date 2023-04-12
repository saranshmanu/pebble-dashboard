import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Divider, Drawer, Typography, Space } from "antd";
import { notifications as placeholders } from "../utils/constants";

const { Text } = Typography;

const Notification = ({ notification = {} }) => {
  const formatDateTime = (datetime) => {
    if (!datetime) return null;
    return dayjs(datetime).format("MMMM D, YYYY H:mm A");
  };
  return (
    <Space direction="vertical" size={1}>
      <Text strong>{notification?.title}</Text>
      <Text type="secondary">{formatDateTime(notification?.datetime)}</Text>
      <Divider className="divider" />
    </Space>
  );
};

const Notifications = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (open) {
      // fetch the notifications from the database
      setNotifications([...placeholders]);
    }
  }, [open]);

  return (
    <Drawer className="notification-section" title="Notifications" placement="right" open={open} onClose={onClose}>
      {notifications.map((notification) => (
        <Notification notification={notification} />
      ))}
    </Drawer>
  );
};

export default Notifications;
