import { Switch, Typography, Divider } from "antd";
const { Title, Text } = Typography;

const Preference = () => {
  const preferences = [
    {
      label: "Summary",
      description: "Summary",
    },
    {
      label: "Interest Rate",
      description: "Interest Rate",
    },
    {
      label: "Distribution Graph",
      description: "Distribution Graph",
    },
    {
      label: "Investment Projection",
      description: "Investment Projection",
    },
  ];
  return (
    <div>
      {preferences.map((preference) => (
        <div>
          <div className="toggle-item">
            <div>
              <Title className="toggle-item-label" level={4}>
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
