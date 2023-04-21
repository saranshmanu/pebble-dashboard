import { Typography } from "antd";
import { PercentageOutlined } from "@ant-design/icons";
import Card from "../Card";

const { Title } = Typography;

const InterestRateCard = ({ data }) => {
  return (
    <Card icon={<PercentageOutlined />}>
      <Title className="no-margin title" level={5}>
        Average Interest Rate
      </Title>
      <Title className="no-margin" level={2}>
        {parseFloat(data?.averageInterestRate || 0).toFixed(2) + " %"}
      </Title>
    </Card>
  );
};

export default InterestRateCard;
