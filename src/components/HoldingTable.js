import { Table, Button, Tag, Badge } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatAmount } from "../utils/commonFunctions";

const columns = [
  {
    title: "Institution",
    dataIndex: "institution",
    fixed: "left",
    width: 200,
  },
  {
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
    title: "Interest Rate (in %)",
    dataIndex: "interestRate",
    width: "110px",
    sorter: {
      compare: (a, b) => parseFloat(a?.interestRate) - parseFloat(b?.interestRate),
      multiple: 1,
    },
  },
  {
    title: "Date",
    dataIndex: "investmentDate",
    width: "110px",
  },
  {
    title: "Compound Frequency",
    dataIndex: "compoundFrequency",
    width: "90px",
    render: (value) => <Tag color="purple">{value}</Tag>,
  },
  {
    title: "Duration (in days)",
    dataIndex: "duration",
    width: "110px",
    sorter: {
      compare: (a, b) => parseFloat(a?.duration) - parseFloat(b?.duration),
      multiple: 1,
    },
    render: (value) => <Badge color="#faad14" count={value} overflowCount={365 * 100} />,
  },
  {
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
    title: "Action",
    dataIndex: "",
    width: "200px",
    key: "x",
    render: () => {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button type="link" size="small" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button type="link" size="small" icon={<DeleteOutlined />}>
            Delete
          </Button>
        </div>
      );
    },
  },
];

const TransactionTable = ({ data }) => {
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return <Table size="small" columns={columns} dataSource={data} onChange={onChange} scroll={{ x: 1000 }} />;
};

export default TransactionTable;
