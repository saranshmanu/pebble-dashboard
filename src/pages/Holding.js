/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal } from "antd";
import { PlusCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import useGetHoldings from "../hooks/getHoldings";
import useCreateHolding from "../hooks/createHolding";
import useRemoveHolding from "../hooks/removeHolding";
import useUpdateHolding from "../hooks/updateHolding";
import HoldingTable from "../components/HoldingTable";
import HoldingForm from "../components/modal/HoldingForm";

const { confirm } = Modal;

function Holding() {
  const [identifier, setIdentifier] = useState("");
  const [isCreateModalOpen, setCreateModalStatus] = useState(false);
  const [isUpdateModalOpen, setUpdateModalStatus] = useState(false);

  const [{ holdingData }, refresh] = useGetHoldings();
  const [updatingRecord, updateHolding] = useUpdateHolding();
  const [removingRecord, deleteHolding] = useRemoveHolding();
  const [creatingRecord, createHolding] = useCreateHolding();

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

  const showUpdateHoldingModal = (uuid) => {
    setIdentifier(uuid);
    setUpdateModalStatus(true);
  };

  useEffect(() => {
    refresh();
  }, [isCreateModalOpen, isUpdateModalOpen, updatingRecord, removingRecord, creatingRecord]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <HoldingForm
        createHolding={createHolding}
        isModalOpen={isCreateModalOpen}
        setModalStatus={setCreateModalStatus}
      />
      <HoldingForm
        updateMode={true}
        identifier={identifier}
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
          <HoldingTable
            data={holdingData}
            showDeleteHoldingModal={showDeleteHoldingModal}
            showUpdateHoldingModal={showUpdateHoldingModal}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Holding;
