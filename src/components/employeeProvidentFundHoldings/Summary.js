import { connect } from "react-redux";
import { useEffect } from "react";
import { Col, Row, Typography } from "antd";
import SummaryCard from "./card/Summary";
import { getEPFTransactions } from "../../database/actions/holding";

const Summary = ({ stats }) => {
  useEffect(() => {
    getEPFTransactions();
  }, []);

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <Typography.Title level={2}>Employer Provident Fund Holdings</Typography.Title>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        {/* Summary Card */}
        <SummaryCard stats={stats} />
      </Col>
    </Row>
  );
};

export default connect(
  (state) => ({ stats: state.holdings.epfStats }),
  () => ({})
)(Summary);
