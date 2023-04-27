import { Col, Row, Statistic } from "antd";
import { formatAmount } from "../../utils/commonFunctions";

const HoldingStats = ({ data }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} lg={12} xl={12}>
        <Statistic
          title="Current Value"
          value={data?.current || 0}
          precision={2}
          formatter={(value) => formatAmount(value)}
        />
      </Col>
      <Col xs={24} sm={12} lg={12} xl={12}>
        <Statistic
          title="Net Profit/Loss"
          value={data?.pnl || 0}
          precision={2}
          formatter={(value) => formatAmount(value)}
        />
      </Col>
    </Row>
  );
};

export default HoldingStats;
