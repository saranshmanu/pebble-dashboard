import { Modal, Table } from "antd";
import createMockData from "../../utils/mock";

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
    sorter: {
      compare: (a, b) => parseInt(a?.principal) - parseInt(b?.principal),
      multiple: 1,
    },
  },
  {
    title: "Interest Rate (in %)",
    dataIndex: "interestRate",
    sorter: {
      compare: (a, b) => parseInt(a?.interestRate) - parseInt(b?.interestRate),
      multiple: 1,
    },
  },
  {
    title: "Date",
    dataIndex: "investmentDate",
  },
  {
    title: "Duration (in days)",
    dataIndex: "duration",
    sorter: {
      compare: (a, b) => parseInt(a?.duration) - parseInt(b?.duration),
      multiple: 1,
    },
  },
  {
    title: "Current Value",
    dataIndex: "currentValue",
    sorter: {
      compare: (a, b) => parseInt(a?.currentValue) - parseInt(b?.currentValue),
      multiple: 1,
    },
  },
  {
    title: "Maturity Amount",
    dataIndex: "maturityAmount",
    sorter: {
      compare: (a, b) => parseInt(a?.maturityAmount) - parseInt(b?.maturityAmount),
      multiple: 1,
    },
  },
];

const TransactionTable = ({ isModalOpen, setModalStatus }) => {
  const data = createMockData();

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Modal
      size="small"
      title="Holdings"
      width={"800px"}
      style={{ top: 20 }}
      open={isModalOpen}
      footer={null}
      onCancel={() => setModalStatus(false)}
    >
      <div>
        <Table size="middle" columns={columns} dataSource={data} onChange={onChange} scroll={{ x: 1000 }} />
      </div>
    </Modal>
  );
};
export default TransactionTable;
