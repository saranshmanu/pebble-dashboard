/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Switch, Typography, Divider } from "antd";
import { preferences } from "../../utils/constants";
import useSettings from "../../hooks/settings";

const { Title, Text } = Typography;

const Preference = () => {
  const [settings, getUserSettings, updateUserSettings] = useSettings();

  useEffect(() => {
    getUserSettings();
  }, []);

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
            <Switch
              onChange={(value) => {
                updateUserSettings({ [preference?.property]: value });
              }}
              checked={settings?.summaryViewSections?.[preference?.property]}
              checkedChildren="1"
              unCheckedChildren="0"
              size="large"
            />
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Preference;
