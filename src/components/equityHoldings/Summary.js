import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row, Button, Result } from "antd";

import SummaryCard from "./card/Summary";
import TimelineCard from "./card/Timeline";
import DistributionCard from "./card/Distribution";
import { getEquityHoldings, getEquityHoldingsSummary } from "../../database/actions/holding";

const Summary = ({ equityStats, equitySummary }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getEquityHoldings();
    getEquityHoldingsSummary();
  }, []);

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
        <SummaryCard stats={equityStats} />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
        <DistributionCard summary={equitySummary} />
      </Col>
      <Col span={24}>
        <TimelineCard data={{}} />
      </Col>
    </Row>
  );
};

export default connect(
  (state) => ({
    equitySummary: state.holdings.equitySummary,
    equityStats: state.holdings.equityStats,
  }),
  (dispatch) => ({})
)(Summary);
