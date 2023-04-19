/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Button, Result } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";

import useHolding from "../hooks/holding";
import Report from "../components/Report";
import useSettings from "../hooks/settings";
import SummaryCard from "../components/card/Summary";
import ProjectionCard from "../components/card/Projection";
import InterestRateCard from "../components/card/InterestRate";
import DistributionCard from "../components/card/Distribution";
import "../styles/Summary.scss";

function Summary({ holdingDistribution, holdingProjection, holdingStats, holdingData }) {
  const navigate = useNavigate();
  const [{ settings }, { getUserSettings }] = useSettings();
  const [{ refresh }] = useHolding();

  useEffect(() => {
    refresh();
  }, [settings]);

  useEffect(() => {
    getUserSettings();
  }, []);

  const isScreenEmpty = (settings = {}) => {
    return (
      !settings?.summaryViewSections?.investmentSummary &&
      !settings?.summaryViewSections?.interestRate &&
      !settings?.summaryViewSections?.distributionGraph &&
      !settings?.summaryViewSections?.projectionGraph
    );
  };

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Report>
            <Button style={{ marginRight: 10 }} icon={<FileDoneOutlined />} size="large">
              Generate Report
            </Button>
          </Report>
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
          <Col xs={24} sm={12} lg={12} xl={8}>
            <SummaryCard data={holdingStats} />
          </Col>
        ) : null}
        {settings?.summaryViewSections?.interestRate ? (
          <Col xs={24} sm={12} lg={12} xl={8}>
            <InterestRateCard data={holdingStats} />
          </Col>
        ) : null}
        {settings?.summaryViewSections?.distributionGraph ? (
          <Col xs={24} sm={12} lg={12} xl={8}>
            <DistributionCard data={holdingDistribution} />
          </Col>
        ) : null}
        {settings?.summaryViewSections?.projectionGraph ? (
          <Col xs={24} sm={12} lg={12} xl={8}>
            <ProjectionCard data={holdingProjection} lineGraphCap={settings?.investmentProjectionCap?.lineGraph || 0} />
          </Col>
        ) : null}
        {settings?.summaryViewSections?.projectionGraph ? (
          <Col xs={24} sm={12} lg={12} xl={8}>
            <ProjectionCard
              data={holdingProjection}
              segregated={true}
              barGraphCap={settings?.investmentProjectionCap?.segregatedBarGraph || 0}
            />
          </Col>
        ) : null}
      </Row>
    </div>
  );
}

export default connect(
  (state) => ({
    holdingDistribution: state.holdings.distribution,
    holdingProjection: state.holdings.projection,
    holdingStats: state.holdings.summary,
    holdingData: state.holdings.holdings,
  }),
  () => ({})
)(Summary);
