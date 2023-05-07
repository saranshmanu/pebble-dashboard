/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Col, Row, Button, Divider, Typography, Modal } from "antd";
import { PlusCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import {
  getEPFTransactions,
  createEPFTransaction,
  updateEPFTransaction,
  deleteEPFTransaction,
  replicateEPFTransaction,
} from "../../database/actions/holding";
import HoldingStats from "./HoldingStats";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";

const { Title } = Typography;
const { confirm, info } = Modal;

function EmployeeProvidentFundHolding({ transactions, stats }) {
  const [identifier, setIdentifier] = useState("");
  const [isCreateModalOpen, setCreateModalStatus] = useState(false);
  const [isUpdateModalOpen, setUpdateModalStatus] = useState(false);

  const showDeleteHoldingModal = (uuid) => {
    confirm({
      title: "Are you sure you want to delete the EPF contribution?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteEPFTransaction(uuid);
      },
      onCancel: () => {},
    });
  };

  const showReplicateHoldingModal = (uuid) => {
    info({
      title: "Are you sure you want to replicate the last EPF contribution?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      closable: true,
      cancelText: "No",
      onOk: () => {
        replicateEPFTransaction(uuid);
      },
      onCancel: () => {},
    });
  };

  const showUpdateHoldingModal = (uuid) => {
    setIdentifier(uuid);
    setUpdateModalStatus(true);
  };

  useEffect(() => {
    getEPFTransactions();
  }, []);

  return (
    <div>
      {/* Transaction Form */}
      <TransactionForm
        createTransaction={createEPFTransaction}
        isModalOpen={isCreateModalOpen}
        setModalStatus={setCreateModalStatus}
      />
      <TransactionForm
        updateMode={true}
        identifier={identifier}
        updateTransaction={updateEPFTransaction}
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
            Contribution
          </Button>
        </Col>
        <Col span={24}>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Title level={3}>Transactions</Title>
          {/* Transaction Table */}
          <TransactionTable
            data={transactions}
            showReplicateHoldingModal={showReplicateHoldingModal}
            showUpdateHoldingModal={showUpdateHoldingModal}
            showDeleteHoldingModal={showDeleteHoldingModal}
          />
        </Col>
        <Col span={24}>
          <Divider style={{ marginTop: 0 }} />
          {/* Holding Stats */}
          <HoldingStats data={stats} />
        </Col>
      </Row>
    </div>
  );
}

export default connect(
  (state) => ({
    institutions: state.institutions.institutions,
    transactions: state.holdings.epfTransactions,
    stats: state.holdings.epfStats,
  }),
  () => ({})
)(EmployeeProvidentFundHolding);
