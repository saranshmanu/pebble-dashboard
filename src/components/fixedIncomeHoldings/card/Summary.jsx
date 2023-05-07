import { connect } from "react-redux";
import { Typography, Divider } from "antd";
import { BankOutlined, CaretUpOutlined } from "@ant-design/icons";
import { formatAmount } from "../../../utils/commonFunctions";
import Card from "../../Card";

const { Title } = Typography;

const SummaryCard = ({ data, darkMode }) => {
  return (
    <Card icon={<BankOutlined />} title="Investment Summary">
      <Title className="no-margin title" level={4}>
        Invested Amount
      </Title>
      <Title className="no-margin" level={3}>
        {formatAmount(data?.totalInvestment)}
      </Title>
      <div style={{ marginBottom: 10 }} />
      <Title className="no-margin title" level={4}>
        Accumulated Interest
      </Title>
      <Title className="no-margin" level={3}>
        {formatAmount(data?.accumulatedInterest)}
      </Title>
      <div style={{ marginBottom: 10 }} />
      <Title className="no-margin title" level={4}>
        Average Interest Rate
      </Title>
      <Title className="no-margin" level={3}>
        {parseFloat(data?.averageInterestRate || 0).toFixed(2) + " %"}
      </Title>
      <Divider style={{ margin: "10px 0px", borderColor: !darkMode ? "#d9d9d9" : "#424242" }} />
      <Title className="no-margin" level={3}>
        = {formatAmount(data?.netAmount)} <CaretUpOutlined style={{ color: "#237804" }} />
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
