/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import useGetHoldings from "../hooks/getHoldings";
import useCreateHolding from "../hooks/createHolding";
import useRemoveHolding from "../hooks/removeHolding";
import HoldingTable from "../components/HoldingTable";
import CreateHolding from "../components/modal/CreateHolding";

function Holding() {
  const [isCreateModalOpen, setCreateModalStatus] = useState(false);
  const [{ holdingData }, refresh] = useGetHoldings();
  const [creatingRecord, createHolding] = useCreateHolding();
  const [removingRecord, deleteHolding] = useRemoveHolding();

  useEffect(() => {
    refresh();
  }, [isCreateModalOpen]);

  useEffect(() => {
    refresh();
  }, [removingRecord]);

  useEffect(() => {
    refresh();
  }, [creatingRecord]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <CreateHolding
        createHolding={createHolding}
        isModalOpen={isCreateModalOpen}
        setModalStatus={setCreateModalStatus}
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
          <HoldingTable data={holdingData} deleteHolding={deleteHolding} />
        </Col>
      </Row>
    </div>
  );
}

export default Holding;
