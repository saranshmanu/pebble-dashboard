import { connect } from "react-redux";
import { useEffect } from "react";
import { Col, Row, Typography } from "antd";

const Summary = ({}) => {
  useEffect(() => {
    // Fetch the latest stats
  }, []);

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <Typography.Title level={2}>Employer Provident Fund Holdings</Typography.Title>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        {/* Summary Card */}
      </Col>
    </Row>
  );
};

export default connect(
  (state) => ({}),
  () => ({})
)(Summary);
