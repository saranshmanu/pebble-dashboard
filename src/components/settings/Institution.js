import { Switch, Typography, Divider, Dropdown, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { institutions } from "../../utils/constants";
const { Title, Text } = Typography;

const Institution = () => {
  return (
    <div>
      {institutions.map((institution) => (
        <div>
          <div className="toggle-item">
            <div className="toggle-option">
              <Title className="toggle-item-label" level={5}>
                {institution.label}
              </Title>
              <Text type="secondary">{institution.description}</Text>
            </div>
            <div className="toggle-dropdown">
              <Switch checkedChildren="1" unCheckedChildren="0" size="large" />
              <Dropdown
                menu={{
                  items: [
                    { key: "1", label: "Edit", icon: <EditOutlined /> },
                    { key: "2", label: "Delete", icon: <DeleteOutlined /> },
                  ],
                  onClick: () => {},
                }}
              >
                <Button type="link" size="small">
                  <Space>
                    <MoreOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Institution;
