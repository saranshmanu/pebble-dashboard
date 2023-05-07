import { connect } from "react-redux";
import { Row, Col, Typography, Divider } from "antd";
import { BankOutlined, CaretUpOutlined } from "@ant-design/icons";
import { formatAmount } from "../../../utils/commonFunctions";
import Card from "../../Card";

const { Title } = Typography;

const SummaryCard = ({ stats, darkMode }) => {
  return (
    <Card icon={<BankOutlined />} title="Investment Summary">
      <Row>
        <Col span={24}>
          <Title className="no-margin title" level={4}>
            Total Employee Contribution
          </Title>
          <Title className="no-margin" level={3}>
            {formatAmount(stats?.employeeShare)}
          </Title>
          <div style={{ marginBottom: 20 }} />
          <Title className="no-margin title" level={4}>
            Total Employer Contribution
          </Title>
          <Title className="no-margin" level={3}>
            {formatAmount(stats?.employerShare)}
          </Title>
          <div style={{ marginBottom: 20 }} />
          <Title className="no-margin title" level={4}>
            Total Pension Contribution
          </Title>
          <Title className="no-margin" level={3}>
            {formatAmount(stats?.pensionShare)}
          </Title>
          <div style={{ marginBottom: 20 }} />
          <Title className="no-margin title" level={4}>
            Total Interest Earned
          </Title>
          <Title className="no-margin" level={3}>
            {formatAmount(stats?.interest)}
          </Title>
          <div style={{ marginBottom: 20 }} />
          <Divider style={{ margin: "10px 0px", borderColor: !darkMode ? "#d9d9d9" : "#424242" }} />
          <Title className="no-margin title" level={4}>
            Net Value
          </Title>
          <Title className="no-margin" level={3}>
            {formatAmount(stats?.employeeShare + stats?.employerShare + stats?.pensionShare + stats?.interest || 0)}
            <CaretUpOutlined style={{ color: "#237804" }} />
          </Title>
        </Col>
      </Row>
    </Card>
  );
};

export default connect(
  (state) => ({
    darkMode: state.settings.darkMode,
  }),
  () => ({})
)(SummaryCard);
