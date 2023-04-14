import { Switch, Typography, Divider } from "antd";
import { preferences } from "../../utils/constants";
const { Title, Text } = Typography;

const Preference = () => {
  return (
    <div>
      {preferences.map((preference, index) => (
        <div key={index}>
          <div className="toggle-item">
            <div className="toggle-option">
              <Title className="toggle-item-label" level={5}>
                {preference.label}
              </Title>
              <Text type="secondary">{preference.description}</Text>
            </div>
            <Switch checkedChildren="1" unCheckedChildren="0" size="large" />
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Preference;
