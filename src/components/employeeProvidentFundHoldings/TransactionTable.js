import { connect } from "react-redux";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { formatAmount } from "../../utils/commonFunctions";

const TransactionTable = ({ data, showDeleteHoldingModal, showUpdateHoldingModal, showReplicateHoldingModal }) => {
  const columns = [
    {
      key: "datetime",
      title: "Period",
      dataIndex: "datetime",
      width: "110px",
      fixed: "left",
      sorter: {
        compare: (a, b) => new Date(a?.datetime) - new Date(b?.datetime),
        multiple: 1,
      },
    },
    {
      key: "employeeShare",
      title: "Employee Contribution",
      dataIndex: "employeeShare",
      width: "110px",
      sorter: {
        compare: (a, b) => parseFloat(a?.employeeShare) - parseFloat(b?.employeeShare),
        multiple: 1,
      },
      render: (value) => formatAmount(value),
    },
    {
      key: "employerShare",
      title: "Employer Contribution",
      dataIndex: "employerShare",
      width: "110px",
      sorter: {
        compare: (a, b) => parseFloat(a?.employerShare) - parseFloat(b?.employerShare),
        multiple: 1,
      },
      render: (value) => formatAmount(value),
    },
    {
      key: "pensionShare",
      title: "Pension Share",
      dataIndex: "pensionShare",
      width: "110px",
      sorter: {
        compare: (a, b) => parseFloat(a?.pensionShare) - parseFloat(b?.pensionShare),
        multiple: 1,
      },
      render: (value) => formatAmount(value),
    },
    {
      key: "uuid",
      title: "Action",
      dataIndex: "uuid",
      width: "160px",
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
