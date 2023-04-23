import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { FullscreenOutlined, BarsOutlined } from "@ant-design/icons";
import { Table, Tag, Space, Button } from "antd";
import { equityHoldingData } from "../../utils/constants";
import { formatAmount } from "../../utils/commonFunctions";

const HoldingTable = ({ darkMode }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([...equityHoldingData]);
  }, []);

  const columns = [
    {
      key: "Instrument",
      title: "Instrument",
      dataIndex: "Instrument",
      width: 150,
      fixed: "left",
    },
    {
      key: "Exchange",
      title: "Exchange",
      dataIndex: "Exchange",
      fixed: "left",
    },
    {
      key: "Type",
      title: "Type",
      dataIndex: "Type",
      render: (value) => (
        <Tag color="blue" bordered={!darkMode} style={{ width: "70px", textAlign: "center" }}>
          {value}
        </Tag>
      ),
    },
    {
      key: "Quantity",
      title: "Quantity",
      dataIndex: "Quantity",
      render: (value) => (
        <Tag color={darkMode ? "gold" : "purple"} bordered={!darkMode} style={{ width: "70px", textAlign: "center" }}>
          {value}
        </Tag>
      ),
    },
    {
      key: "LTP",
      title: "LTP (in ₹)",
      dataIndex: "LTP",
      render: (value) => formatAmount(value),
    },
    {
      key: "Current",
      title: "Current Value (in ₹)",
      dataIndex: "Current",
      sorter: (a, b) => a.Current - b.Current,
      render: (value) => <b>{formatAmount(value)}</b>,
    },
    {
      key: "Net",
      title: "Net P/L (in ₹)",
      dataIndex: "Net",
      sorter: (a, b) => a.Net - b.Net,
      render: (value) => {
        if (value < 0) {
          return <div style={{ color: "red" }}>{value}</div>;
        } else if (value > 0) {
          return <div style={{ color: "green" }}>{value}</div>;
        }
        return value;
      },
    },
    {
      key: "uuid",
      title: "Action",
      dataIndex: "uuid",
      width: 300,
      render: (_, record) => {
        return (
          <Space direction="horizontal" size={0}>
            <Button type="link" size="small" icon={<BarsOutlined />} onClick={() => {}}>
              Puchase History
            </Button>
            <Button type="link" size="small" icon={<FullscreenOutlined />} onClick={() => {}}>
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
    <Table bordered rowKey="Key" size="small" columns={columns} dataSource={data} onChange={onChange} scroll={{ x: 1200 }} />
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(HoldingTable);
