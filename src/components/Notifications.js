/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useEffect } from "react";
import { Divider, Drawer, Typography, Space } from "antd";
import useNotification from "../hooks/notification";

const { Text } = Typography;

const Notification = ({ notification = {} }) => {
  const formatDateTime = (datetime) => {
    if (!datetime) return null;
    return dayjs(datetime).format("MMMM D, YYYY H:mm A");
  };
  return (
    <Space direction="vertical" size={1}>
      <Text strong>{notification?.notification}</Text>
      <Text type="secondary">{formatDateTime(notification?.datetime)}</Text>
      <Divider className="divider" />
    </Space>
  );
};

const Notifications = ({ open, onClose }) => {
  const [{ notifications }, { getNotifications }] = useNotification();

  useEffect(() => {
    if (open) {
      // fetch the notifications from the database
      getNotifications();
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
