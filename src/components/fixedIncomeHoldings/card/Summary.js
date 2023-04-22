import { connect } from "react-redux";
import { Typography, Divider } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { formatAmount } from "../../../utils/commonFunctions";
import Card from "../../Card";

const { Title } = Typography;

const SummaryCard = ({ data, darkMode }) => {
  return (
    <Card icon={<BankOutlined />}>
      <Title className="no-margin title" level={5}>
        Invested Amount
      </Title>
      <Title className="no-margin" level={5}>
        {formatAmount(data?.totalInvestment)}
      </Title>
      <div style={{ marginBottom: 10 }} />
      <Title className="no-margin title" level={5}>
        Accumulated Interest
      </Title>
      <Title className="no-margin" level={5}>
        {formatAmount(data?.accumulatedInterest)}
      </Title>
      <div style={{ marginBottom: 10 }} />
      <Title className="no-margin title" level={5}>
        Average Interest Rate
      </Title>
      <Title className="no-margin" level={5}>
        {parseFloat(data?.averageInterestRate || 0).toFixed(2) + " %"}
      </Title>
      <Divider style={{ margin: "10px 0px", borderColor: !darkMode ? "#d9d9d9" : "#424242" }} />
      <Title className="no-margin" level={4}>
        = {formatAmount(data?.netAmount)}
      </Title>
    </Card>
  );
};

export default connect(
  (state) => ({
    darkMode: state.settings.darkMode,
  }),
  () => ({})
)(SummaryCard);
