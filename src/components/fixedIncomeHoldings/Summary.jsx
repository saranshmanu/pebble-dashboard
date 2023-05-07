import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Button, Result, Typography } from "antd";

import { getHoldings } from "../../database/actions/holding";
import SummaryCard from "./card/Summary";
import ProjectionCard from "./card/Projection";
import DistributionCard from "./card/Distribution";
import useSettings from "../../hooks/settings";

const Summary = ({ holdingDistribution, holdingProjection, holdingStats }) => {
  const navigate = useNavigate();
  const [{ settings }, { getUserSettings }] = useSettings();

  useEffect(() => {
    getHoldings();
  }, [settings]);

  useEffect(() => {
    getUserSettings();
  }, []);
  const isScreenEmpty = (settings = {}) => {
    return (
      !settings?.summaryViewSections?.investmentSummary &&
      !settings?.summaryViewSections?.distributionGraph &&
      !settings?.summaryViewSections?.projectionGraph
    );
  };

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <Typography.Title level={2}>Fixed Income Securities</Typography.Title>
      </Col>
      {isScreenEmpty(settings) ? (
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
      {settings?.summaryViewSections?.investmentSummary ? (
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <SummaryCard data={holdingStats} />
        </Col>
      ) : null}
      {settings?.summaryViewSections?.distributionGraph ? (
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <DistributionCard data={holdingDistribution} />
        </Col>
      ) : null}
      {settings?.summaryViewSections?.projectionGraph ? (
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <ProjectionCard data={holdingProjection} lineGraphCap={settings?.investmentProjectionCap?.lineGraph || 0} />
        </Col>
      ) : null}
      {settings?.summaryViewSections?.projectionGraph ? (
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <ProjectionCard
            data={holdingProjection}
            segregated={true}
            barGraphCap={settings?.investmentProjectionCap?.segregatedBarGraph || 0}
          />
        </Col>
      ) : null}
    </Row>
  );
};

export default connect(
  (state) => ({
    holdingDistribution: state.holdings.distribution,
    holdingProjection: state.holdings.projection,
    holdingStats: state.holdings.summary,
  }),
  () => ({})
)(Summary);
