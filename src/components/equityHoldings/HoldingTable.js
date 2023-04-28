import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { FullscreenOutlined, BarsOutlined } from "@ant-design/icons";
import { Table, Tag, Space, Button } from "antd";
import { formatAmount } from "../../utils/commonFunctions";

const HoldingTable = ({
  darkMode,
  setTradingChartModalVisible,
  setSelectedInstrumentIdentifier,
  transactionTableVisible,
  instruments,
}) => {
  const columns = [
    {
      key: "Instrument",
      title: "Instrument",
      dataIndex: "label",
      width: 150,
      fixed: "left",
    },
    {
      key: "Exchange",
      title: "Exchange",
      dataIndex: "Exchange",
      width: 100,
      fixed: "left",
      render: (value) => "NSE",
    },
    {
      key: "Type",
      title: "Type",
      dataIndex: "type",
      render: (value) => (
        <Tag color="blue" bordered={!darkMode} style={{ width: "70px", textAlign: "center" }}>
          {value}
        </Tag>
      ),
    },
    {
      key: "Quantity",
      title: "Quantity",
      dataIndex: "quantity",
      render: (value) => (
        <Tag color={darkMode ? "gold" : "purple"} bordered={!darkMode} style={{ width: "70px", textAlign: "center" }}>
          {value}
        </Tag>
      ),
    },
    {
      key: "LTP",
      title: "LTP (in ₹)",
      dataIndex: "lastTradingValue",
      render: (value) => formatAmount(value),
    },
    {
      key: "Current",
      title: "Current Value (in ₹)",
      dataIndex: "current",
      sorter: (a, b) => a.current - b.current,
      render: (value) => <b>{formatAmount(value)}</b>,
    },
    {
      key: "Net",
      title: "Net P/L (in ₹)",
      dataIndex: "net",
      sorter: (a, b) => a.net - b.net,
      render: (value) => {
        if (value < 0) {
          return <div style={{ color: "red" }}>{formatAmount(value)}</div>;
        } else if (value > 0) {
          return <div style={{ color: "green" }}>{formatAmount(value)}</div>;
        }
        return value;
      },
    },
    {
      key: "uuid",
      title: "Action",
      dataIndex: "uuid",
      width: 300,
      render: (value, record) => {
        return (
          <Space direction="horizontal" size={0}>
            <Button
              type="link"
              size="small"
              icon={<BarsOutlined />}
              onClick={() => {
                setSelectedInstrumentIdentifier(value);
                transactionTableVisible(true);
              }}
            >
              Puchase History
            </Button>
            <Button
              type="link"
              size="small"
              icon={<FullscreenOutlined />}
              onClick={() => {
                setSelectedInstrumentIdentifier(record?.graphIdentifier);
                setTradingChartModalVisible(true);
              }}
            >
              View Chart
            </Button>
          </Space>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      bordered
      rowKey="uuid"
      size="small"
      columns={columns}
      dataSource={instruments}
      onChange={onChange}
      scroll={{ x: 1200 }}
    />
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(HoldingTable);
