import { connect } from "react-redux";
import { Table, Button, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { formatAmount, formatPercentage } from "../../utils/commonFunctions";

const TransactionTable = ({
  data,
  showDeleteHoldingModal,
  showUpdateHoldingModal,
  showReplicateHoldingModal,
  darkMode,
}) => {
  const columns = [
    {
      key: "institution",
      title: "Institution",
      dataIndex: "institution",
      fixed: "left",
      width: 200,
    },
    {
      key: "principal",
      title: "Principal",
      dataIndex: "principal",
      width: "110px",
      sorter: {
        compare: (a, b) => parseFloat(a?.principal) - parseFloat(b?.principal),
        multiple: 1,
      },
      render: (value) => formatAmount(value),
    },
    {
      key: "interestRate",
      title: "Interest Rate (in %)",
      dataIndex: "interestRate",
      width: "110px",
      sorter: {
        compare: (a, b) => parseFloat(a?.interestRate) - parseFloat(b?.interestRate),
        multiple: 1,
      },
      render: (value) => formatPercentage(value),
    },
    {
      key: "investmentDate",
      title: "Date",
      dataIndex: "investmentDate",
      width: "110px",
    },
    {
      key: "compoundFrequency",
      title: "Compound Frequency",
      dataIndex: "compoundFrequency",
      width: "110px",
      render: (value) => (
        <Tag
          color={darkMode ? "gold" : "purple"}
          bordered={!darkMode}
          style={{ minWidth: "80px", textAlign: "center" }}
        >
          {value}
        </Tag>
      ),
    },
    {
      key: "duration",
      title: "Duration (in days)",
      dataIndex: "duration",
      width: "110px",
      sorter: {
        compare: (a, b) => parseFloat(a?.duration) - parseFloat(b?.duration),
        multiple: 1,
      },
      render: (value) => (
        <Tag color="blue" bordered={!darkMode} style={{ minWidth: "70px", textAlign: "center" }}>
          {value}
        </Tag>
      ),
    },
    {
      key: "currentValue",
      title: "Current Value",
      dataIndex: "currentValue",
      width: "110px",
      sorter: {
        compare: (a, b) => parseFloat(a?.currentValue) - parseFloat(b?.currentValue),
        multiple: 1,
      },
      render: (value) => <b>{formatAmount(value)}</b>,
    },
    {
      key: "maturityAmount",
      title: "Maturity Amount",
      dataIndex: "maturityAmount",
      width: "110px",
      sorter: {
        compare: (a, b) => parseFloat(a?.maturityAmount) - parseFloat(b?.maturityAmount),
        multiple: 1,
      },
      render: (value) => formatAmount(value),
    },
    {
      key: "remainingInterest",
      title: "Interest to be earned",
      dataIndex: "remainingInterest",
      width: "110px",
      sorter: {
        compare: (a, b) => parseFloat(a?.remainingInterest) - parseFloat(b?.remainingInterest),
        multiple: 1,
      },
      render: (value) => formatAmount(value),
    },
    {
      key: "uuid",
      title: "Action",
      dataIndex: "uuid",
      width: "250px",
      render: (_, record) => {
        return (
          <Space direction="horizontal" size={0}>
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                showUpdateHoldingModal(record?.uuid);
              }}
            >
              Edit
            </Button>
            <Button
              type="link"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => {
                showReplicateHoldingModal(record?.uuid);
              }}
            >
              Replicate
            </Button>
            <Button
              type="link"
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => {
                showDeleteHoldingModal(record?.uuid);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  return (
    <Table
      bordered
      rowKey="uuid"
      size="small"
      columns={columns}
      dataSource={data}
      onChange={onChange}
      scroll={{ x: 1000 }}
    />
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(TransactionTable);
