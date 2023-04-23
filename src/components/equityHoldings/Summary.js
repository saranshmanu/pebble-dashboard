import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row, Button, Result } from "antd";

import SummaryCard from "./card/Summary";
import TimelineCard from "./card/Timeline";
import DistributionCard from "./card/Distribution";

const Summary = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={[10, 10]}>
      {false ? (
        <Col span={24} style={{ marginTop: "80px" }}>
          <Result
            title="No summary view selected. You can customise the summary page by changing the preference settings under the Settings page."
            extra={
              <Button type="primary" key="console" onClick={() => navigate("/dashboard/settings")}>
                Go to settings
              </Button>
            }
          />
        </Col>
      ) : null}
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
        <SummaryCard />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
        <DistributionCard data={{}} />
      </Col>
      <Col span={24}>
        <TimelineCard data={{}} />
      </Col>
    </Row>
  );
};

export default connect(
  (state) => ({}),
  () => ({})
)(Summary);
