/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Row, Button, Divider, Typography } from "antd";
import { getInstitutions } from "../../database/actions/institution";
import TransactionTable from "./TransactionTable";
import HoldingStats from "./HoldingStats";
import { contributions } from "../../utils/constants";

const { Title } = Typography;

function EmployeeProvidentFundHolding() {
  const [isCreateModalOpen, setCreateModalStatus] = useState(false);

  useEffect(() => {
    getInstitutions();
  }, []);

  return (
    <div>
      {/* Holding Form */}
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
          <Button
            onClick={() => {}}
            style={{ marginRight: 10 }}
            icon={<PlusCircleOutlined />}
            type="primary"
            size="large"
          >
            Replicate
          </Button>
        </Col>
        <Col span={24}>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Title level={3}>Transactions</Title>
          {/* Holding Table */}
          <TransactionTable data={[...contributions, ...contributions, ...contributions]} />
        </Col>
        <Col span={24}>
          <Divider style={{ marginTop: 0 }} />
          {/* Holding Stats */}
          <HoldingStats />
        </Col>
      </Row>
    </div>
  );
}

export default connect(
  (state) => ({
    institutions: state.institutions.institutions,
  }),
  () => ({})
)(EmployeeProvidentFundHolding);
