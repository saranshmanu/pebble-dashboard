import { Typography, Divider } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { formatAmount } from "../../utils/commonFunctions";
import Card from "../Card";

const { Title } = Typography;

const SummaryCard = ({ data }) => {
  return (
    <Card icon={<BankOutlined />}>
      <Title className="no-margin" level={5}>
        Invested Amount
      </Title>
      <Title className="no-margin" level={4}>
        + {formatAmount(data?.totalInvestment)}
      </Title>
      <div style={{ marginBottom: 10 }} />
      <Title className="no-margin" level={5}>
        Accumulated Interest
      </Title>
      <Title className="no-margin" level={4}>
        + {formatAmount(data?.accumulatedInterest)}
      </Title>
      <Divider style={{ margin: "10px 0px", borderColor: "#000" }} />
      <Title className="no-margin" level={2}>
        = {formatAmount(data?.netAmount)}
      </Title>
    </Card>
  );
};

export default SummaryCard;
