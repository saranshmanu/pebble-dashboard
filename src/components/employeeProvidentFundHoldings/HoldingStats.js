import { Col, Row, Statistic } from "antd";
import { formatAmount } from "../../utils/commonFunctions";

const HoldingStats = ({ data }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} lg={12} xl={8}>
        <Statistic
          title="Total Employee Contribution"
          value={data?.employeeShare || 0}
          precision={2}
          formatter={(value) => formatAmount(value)}
        />
      </Col>
      <Col xs={24} sm={12} lg={12} xl={8}>
        <Statistic
          title="Total Employer Contribution"
          value={data?.employerShare || 0}
          precision={2}
          formatter={(value) => formatAmount(value)}
        />
      </Col>
      <Col xs={24} sm={12} lg={12} xl={8}>
        <Statistic
          title="Total Pension Share"
          value={data?.pensionShare || 0}
          precision={2}
          formatter={(value) => formatAmount(value)}
        />
      </Col>
      <Col xs={24} sm={12} lg={12} xl={8}>
        <Statistic
          title="Net Value"
          value={data?.employeeShare + data?.employerShare + data?.pensionShare || 0}
          precision={2}
          formatter={(value) => formatAmount(value)}
        />
      </Col>
      <Col xs={24} sm={12} lg={12} xl={8}>
        <Statistic
          title="Total Interest Earned"
          value={data?.interest || 0}
          precision={2}
          formatter={(value) => formatAmount(value)}
        />
      </Col>
    </Row>
  );
};

export default HoldingStats;
