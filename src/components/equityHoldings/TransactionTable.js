import { connect } from "react-redux";
import { Col, Row, Table, Tag, Button, Space, Modal } from "antd";
import { EditOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { equityTransactionData as data } from "../../utils/constants";
import { formatAmount } from "../../utils/commonFunctions";

const TransactionTable = ({ darkMode, setVisible, isOpen }) => {
  const columns = [
    {
      key: "Instrument",
      title: "Instrument",
      dataIndex: "Instrument",
      width: 150,
      fixed: "left",
    },
    {
      key: "Date",
      title: "Date",
      dataIndex: "Date",
      width: 150,
    },
    {
      key: "Type",
      title: "B/S",
      dataIndex: "Buy",
      width: 60,
      render: (value) => (
        <Tag color="orange" bordered={!darkMode} style={{ width: "40px", textAlign: "center" }}>
          {value ? "Buy" : "Sell"}
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
      key: "Average",
      title: "Average (in ₹)",
      dataIndex: "Average",
      render: (value) => formatAmount(value),
    },
    {
      key: "Net",
      title: "Net (in ₹)",
      dataIndex: "Net",
      sorter: (a, b) => a.Net - b.Net,
      render: (value) => <b>{value}</b>,
    },
    {
      key: "uuid",
      title: "Action",
      dataIndex: "uuid",
      width: 250,
      render: (_, record) => {
        return (
          <Space direction="horizontal" size={0}>
            <Button type="link" size="small" icon={<EditOutlined />} onClick={() => {}}>
              Edit
            </Button>
            <Button type="link" size="small" icon={<CopyOutlined />} onClick={() => {}}>
              Replicate
            </Button>
            <Button type="link" size="small" icon={<DeleteOutlined />} onClick={() => {}}>
              Delete
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
    <Modal title="Market Order History" open={isOpen} footer={[]} onCancel={() => setVisible(false)} width={"80%"}>
      <Row>
        <Col span={24}>
          <Table
            size="small"
            columns={columns}
            dataSource={[
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
            ]}
            onChange={onChange}
            scroll={{ x: 700 }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(TransactionTable);
