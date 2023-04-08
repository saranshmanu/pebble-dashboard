import { Typography } from "antd";
import { PercentageOutlined } from "@ant-design/icons";

const { Title } = Typography;

const InterestRateCard = ({ data }) => {
  return (
    <div className="information-card interest-rate-card">
      <div className="card-body">
        <div className="icon">
          <PercentageOutlined fontSize="large" />
        </div>
        <div>
          <Title level={5} style={{ margin: 0 }}>
            {"Average Interest Rate"}
          </Title>
          <Title level={2} style={{ margin: 0 }}>
            {parseFloat(data?.averageInterestRate || 0).toFixed(2) + " %"}
          </Title>
        </div>
      </div>
    </div>
  );
};

export default InterestRateCard;
