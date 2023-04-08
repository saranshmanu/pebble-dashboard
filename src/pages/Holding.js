/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import useGetHoldings from "../hooks/getHoldings";
import HoldingTable from "../components/HoldingTable";
import CreateHolding from "../components/modal/CreateHolding";

function Holding() {
  const [isViewModalOpen, setViewModalStatus] = useState(false);
  const [isCreateModalOpen, setCreateModalStatus] = useState(false);
  const [{ holdingData }, refresh] = useGetHoldings([]);

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
      <CreateHolding isModalOpen={isCreateModalOpen} setModalStatus={setCreateModalStatus} />
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
          <HoldingTable isModalOpen={isViewModalOpen} setModalStatus={setViewModalStatus} holdingData={holdingData} />
        </Col>
      </Row>
    </div>
  );
}

export default Holding;
