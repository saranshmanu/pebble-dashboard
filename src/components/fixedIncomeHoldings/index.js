/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal, Divider } from "antd";
import { PlusCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import {
  updateHolding,
  deleteHolding,
  createHolding,
  replicateHolding,
  getHoldings,
} from "../../database/actions/holding";
import { getInstitutions } from "../../database/actions/institution";
import HoldingStats from "./HoldingStats";
import HoldingTable from "./HoldingTable";
import HoldingForm from "./HoldingForm";

const { confirm, info } = Modal;

function FixedIncomeHolding({ institutions, holdingData, holdingStats }) {
  const [identifier, setIdentifier] = useState("");
  const [isCreateModalOpen, setCreateModalStatus] = useState(false);
  const [isUpdateModalOpen, setUpdateModalStatus] = useState(false);

  const showDeleteHoldingModal = (uuid) => {
    confirm({
      title: "Are you sure you want to delete the investment record?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteHolding(uuid);
      },
      onCancel: () => {},
    });
  };

  const showReplicateHoldingModal = (uuid) => {
    info({
      title: "Are you sure you want to replicate the investment record?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      closable: true,
      cancelText: "No",
      onOk: () => {
        replicateHolding(uuid);
      },
      onCancel: () => {},
    });
  };

  const showUpdateHoldingModal = (uuid) => {
    setIdentifier(uuid);
    setUpdateModalStatus(true);
  };

  useEffect(() => {
    getHoldings();
    getInstitutions();
  }, []);

  return (
    <div>
      <HoldingForm
        institutions={institutions}
        createHolding={createHolding}
        isModalOpen={isCreateModalOpen}
        setModalStatus={setCreateModalStatus}
      />
      <HoldingForm
        updateMode={true}
        identifier={identifier}
        institutions={institutions}
        updateHolding={updateHolding}
        isModalOpen={isUpdateModalOpen}
        setModalStatus={setUpdateModalStatus}
      />
      <Row>
        <Col span={24}>
          <Button
            onClick={() => setCreateModalStatus(true)}
            style={{ marginRight: 10 }}
            icon={<PlusCircleOutlined />}
            type="primary"
            size="large"
          >
            Investment
          </Button>
        </Col>
        <Col span={24}>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <HoldingTable
            data={holdingData}
            showDeleteHoldingModal={showDeleteHoldingModal}
            showUpdateHoldingModal={showUpdateHoldingModal}
            showReplicateHoldingModal={showReplicateHoldingModal}
          />
        </Col>
        <Col span={24}>
          <Divider style={{ marginTop: 0 }} />
          <HoldingStats
            data={{
              principal: holdingStats?.totalInvestment,
              interest: holdingStats?.accumulatedInterest,
              netValue: holdingStats?.netAmount,
              averageInterestRate: holdingStats?.averageInterestRate,
            }}
          />
          <Divider />
        </Col>
      </Row>
    </div>
  );
}

export default connect(
  (state) => ({
    institutions: state.institutions.institutions,
    holdingStats: state.holdings.summary,
    holdingData: state.holdings.holdings,
  }),
  () => ({})
)(FixedIncomeHolding);
