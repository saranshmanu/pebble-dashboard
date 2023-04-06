import { Typography } from "antd";
import { PercentageOutlined } from "@ant-design/icons";

const { Title } = Typography;

const InterestRateCard = ({ data }) => {
  return (
    <div className="information-card interest-rate-card">
      <div className="card-body">
        <div style={{ margin: "0px 0px 40px 0px", fontSize: "30px" }}>
          <PercentageOutlined fontSize="large" />
        </div>
        <div>
          <Title level={5} style={{ margin: 0 }}>
            {"Average Interest Rate"}
          </Title>
          <Title level={2} style={{ margin: 0 }}>
            {(data?.interestRate || 0) + " %"}
          </Title>
        </div>
      </div>
    </div>
  );
};

export default InterestRateCard;
