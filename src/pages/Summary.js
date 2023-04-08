/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import { TableOutlined, PlusCircleOutlined } from "@ant-design/icons";
import ProjectionCard from "../components/card/Projection";
import InterestRateCard from "../components/card/InterestRate";
import SummaryCard from "../components/card/Summary";
import DistributionCard from "../components/card/Distribution";
import TransactionTable from "../components/modal/TransactionTable";
import CreateHolding from "../components/modal/CreateHolding";
import useGetHoldings from "../hooks/getHoldings";
import "../styles/Summary.scss";

function Summary() {
  const [holdingProjection, holdingStats, holdingData, holdingDistribution, refresh] = useGetHoldings([]);
  const [isViewModalOpen, setViewModalStatus] = useState(false);
  const [isCreateModalOpen, setCreateModalStatus] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (isViewModalOpen === true) {
      refresh();
    }
  }, [isViewModalOpen]);

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <CreateHolding isModalOpen={isCreateModalOpen} setModalStatus={setCreateModalStatus} />
          <TransactionTable
            isModalOpen={isViewModalOpen}
            setModalStatus={setViewModalStatus}
            holdingData={holdingData}
          />
          <Button
            style={{ marginRight: 10 }}
            icon={<TableOutlined />}
            type="primary"
            size="large"
            onClick={() => setViewModalStatus(true)}
          >
            Holdings
          </Button>
          <Button
            style={{ marginRight: 10 }}
            icon={<PlusCircleOutlined />}
            size="large"
            onClick={() => setCreateModalStatus(true)}
          >
            Investment
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
