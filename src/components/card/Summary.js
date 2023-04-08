import { Typography, Divider } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { formatAmount } from "../../utils/commonFunctions";

const { Title } = Typography;

const SummaryCard = ({ data }) => {
  return (
    <div className="information-card summary-card">
      <div className="card-body">
        <div className="icon">
          <BankOutlined />
        </div>
        <div>
          <Title level={5} style={{ margin: 0 }}>
            {"Invested Amount"}
          </Title>
          <Title level={3} style={{ margin: 0 }}>
            + {formatAmount(data?.totalInvestment)}
          </Title>
          <div style={{ marginBottom: 10 }} />
          <Title level={5} style={{ margin: 0 }}>
            {"Accumulated Interest"}
          </Title>
          <Title level={3} style={{ margin: 0 }}>
            + {formatAmount(data?.accumulatedInterest)}
          </Title>
          <Divider style={{ margin: "10px 0px", borderColor: "#000" }} />
          <Title level={2} style={{ margin: 0 }}>
            = {formatAmount(data?.netAmount)}
          </Title>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
