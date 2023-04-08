import { Typography } from "antd";
import { PercentageOutlined } from "@ant-design/icons";
import Card from "../Card";

const { Title } = Typography;

const InterestRateCard = ({ data }) => {
  return (
    <Card icon={<PercentageOutlined />} className="purple-gradient">
      <Title level={5} style={{ margin: 0 }}>
        {"Average Interest Rate"}
      </Title>
      <Title level={2} style={{ margin: 0 }}>
        {parseFloat(data?.averageInterestRate || 0).toFixed(2) + " %"}
      </Title>
    </Card>
  );
};

export default InterestRateCard;
