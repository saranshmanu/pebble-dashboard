import { connect } from "react-redux";
import { Row, Col, Typography } from "antd";
import { BankOutlined, CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { formatAmount, formatPercentage } from "../../../utils/commonFunctions";
import Card from "../../Card";

const { Title } = Typography;

const SummaryCard = ({ stats }) => {
  return (
    <Card icon={<BankOutlined />}>
      <Row>
        <Col span={12}>
          <Title className="no-margin title" level={4}>
            Current Value
          </Title>
          <Title className="no-margin" level={3}>
            {formatAmount(stats?.current)}
          </Title>
          <div style={{ marginBottom: 20 }} />
          <Title className="no-margin title" level={4}>
            Net Profit/ Loss
          </Title>
          <Title className="no-margin" level={3}>
            {formatAmount(stats?.pnl)}
            {stats?.pnl >= 0 ? (
              <CaretUpOutlined style={{ color: "#237804" }} />
            ) : (
              <CaretDownOutlined style={{ color: "#ff4d4f" }} />
            )}
          </Title>
          <div style={{ marginBottom: 20 }} />
          <Title className="no-margin title" level={4}>
            Net Profit/ Loss %
          </Title>
          <Title className="no-margin" level={3}>
            {formatPercentage((stats?.pnl * 100) / stats?.current)}
          </Title>
        </Col>
        <Col span={12}>
          <Title className="no-margin title" level={4}>
            Top Gains
          </Title>
          <Title className="no-margin" level={3} style={{ color: "#237804" }}>
            {stats?.topGains?.title}
          </Title>
          <Title className="no-margin" level={3} style={{ color: "#237804" }}>
            {formatAmount(stats?.topGains?.value)}
          </Title>
          <div style={{ marginBottom: 20 }} />
          <Title className="no-margin title" level={4}>
            Top Losses
          </Title>
          <Title className="no-margin" level={3} style={{ color: "#ff4d4f" }}>
            {stats?.topLosses?.title}
          </Title>
          <Title className="no-margin" level={3} style={{ color: "#ff4d4f" }}>
            {formatAmount(stats?.topLosses?.value)}
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
