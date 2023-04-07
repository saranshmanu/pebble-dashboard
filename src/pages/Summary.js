import React, { useState } from "react";
import { Col, Row, Button } from "antd";
import { TableOutlined, PlusCircleOutlined } from "@ant-design/icons";
import ProjectionCard from "../components/card/Projection";
import InterestRateCard from "../components/card/InterestRate";
import SummaryCard from "../components/card/Summary";
import TransactionTable from "../components/modal/TransactionTable";
import CreateHolding from "../components/modal/CreateHolding";
import "../styles/Summary.scss";

function Summary() {
  const [isModalOpen, setModalStatus] = useState(false);
  const [isCreateModalOpen, setCreateModalStatus] = useState(false);


  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <CreateHolding isModalOpen={isCreateModalOpen} setModalStatus={setCreateModalStatus} />
          <TransactionTable isModalOpen={isModalOpen} setModalStatus={setModalStatus} />
          <Button
            style={{ marginRight: 10 }}
            icon={<TableOutlined />}
            type="primary"
            size="large"
            onClick={() => setModalStatus(true)}
          >
            Holdings
          </Button>
          <Button icon={<PlusCircleOutlined />} size="large" onClick={() => setCreateModalStatus(true)}>
            Investment
          </Button>
        </Col>
        <Col xs={24} sm={12} lg={12} xl={8}>
          <SummaryCard
            data={{
              invested: "₹3,034,441",
              accumulated: "₹102,762.75",
              net: "₹3,137,203.75",
            }}
          />
        </Col>
        <Col xs={24} sm={12} lg={12} xl={5}>
          <InterestRateCard data={{ interestRate: 5.2 }} />
        </Col>
        <Col xs={24} sm={24} lg={12} xl={11}>
          <ProjectionCard />
        </Col>
      </Row>
    </div>
  );
}

export default Summary;
