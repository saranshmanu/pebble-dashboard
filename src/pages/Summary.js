/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Col, Row, Button } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";

import useHolding from "../hooks/holding";
import SummaryCard from "../components/card/Summary";
import ProjectionCard from "../components/card/Projection";
import InterestRateCard from "../components/card/InterestRate";
import DistributionCard from "../components/card/Distribution";
import "../styles/Summary.scss";

function Summary() {
  const [{ holdingProjection, holdingStats, holdingDistribution }, { refresh }] = useHolding();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Button style={{ marginRight: 10 }} icon={<FileDoneOutlined />} size="large" onClick={() => {}}>
            Generate Report
          </Button>
        </Col>
        <Col xs={24} sm={12} lg={12} xl={7}>
          <SummaryCard data={holdingStats} />
        </Col>
        <Col xs={24} sm={12} lg={12} xl={6}>
          <InterestRateCard data={holdingStats} />
        </Col>
        <Col xs={24} sm={24} lg={12} xl={11}>
          <DistributionCard data={holdingDistribution} />
        </Col>
        <Col xs={24} sm={24} lg={12} xl={13}>
          <ProjectionCard data={holdingProjection} />
        </Col>
      </Row>
    </div>
  );
}

export default Summary;
