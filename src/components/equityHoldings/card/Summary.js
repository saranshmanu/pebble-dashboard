import { connect } from "react-redux";
import { Row, Col, Typography } from "antd";
import { BankOutlined, CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { formatAmount, formatPercentage } from "../../../utils/commonFunctions";
import Card from "../../Card";

const { Title } = Typography;

const SummaryCard = ({
  data = {
    current: 100000,
    change: 23400,
    topGains: { title: "Vendanta", value: 1290 },
    topLosses: { title: "Zomato", value: -3644 },
  },
  darkMode,
}) => {
  return (
    <Card icon={<BankOutlined />}>
      <Row>
        <Col span={12}>
          <Title className="no-margin title" level={4}>
            Current Value
          </Title>
          <Title className="no-margin" level={3}>
            {formatAmount(data?.current)}
          </Title>
          <div style={{ marginBottom: 20 }} />
          <Title className="no-margin title" level={4}>
            Net Profit/ Loss
          </Title>
          <Title className="no-margin" level={3}>
            {formatAmount(data?.change)}
            {data?.change >= 0 ? (
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
            {formatPercentage((data?.change * 100) / data?.current)}
          </Title>
        </Col>
        <Col span={12}>
          <Title className="no-margin title" level={4}>
            Top Gains
          </Title>
          <Title className="no-margin" level={3} style={{ color: "#237804" }}>
            {data?.topGains?.title}
          </Title>
          <Title className="no-margin" level={3} style={{ color: "#237804" }}>
            {formatAmount(data?.topGains?.value)}
          </Title>
          <div style={{ marginBottom: 20 }} />
          <Title className="no-margin title" level={4}>
            Top Losses
          </Title>
          <Title className="no-margin" level={3} style={{ color: "#ff4d4f" }}>
            {data?.topLosses?.title}
          </Title>
          <Title className="no-margin" level={3} style={{ color: "#ff4d4f" }}>
            {formatAmount(data?.topLosses?.value)}
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
