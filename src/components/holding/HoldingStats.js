import { Col, Row, Statistic } from "antd";
import { formatAmount, formatPercentage } from "../../utils/commonFunctions";

const HoldingStats = ({ data }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} lg={6} xl={6}>
        <Statistic
          title="Principal Amount"
          value={data?.principal}
          precision={2}
          formatter={(value) => formatAmount(value)}
        />
      </Col>
      <Col xs={24} sm={12} lg={6} xl={6}>
        <Statistic
          title="Accumulated Interest"
          value={data?.interest}
          precision={2}
          formatter={(value) => formatAmount(value)}
        />
      </Col>
      <Col xs={24} sm={12} lg={6} xl={6}>
        <Statistic title="Net Value" value={data?.netValue} precision={2} formatter={(value) => formatAmount(value)} />
      </Col>
      <Col xs={24} sm={12} lg={6} xl={6}>
        <Statistic
          title="Average Interest Rate"
          value={data?.averageInterestRate}
          precision={2}
          formatter={(value) => formatPercentage(value)}
        />
      </Col>
    </Row>
  );
};

export default HoldingStats;
