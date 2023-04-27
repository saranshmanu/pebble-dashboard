import dayjs from "dayjs";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Col, Row, Table, Tag, Button, Space, Modal, Popconfirm } from "antd";
import { Form, InputNumber, Input, DatePicker, Select } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { formatAmount } from "../../utils/commonFunctions";

const EditableTransactionCell = ({ instruments, editing, dataIndex, title, record, index, children, ...restProps }) => {
  let inputNode;

  if (dataIndex === "quantity" || dataIndex === "average") {
    inputNode = <InputNumber />;
  } else if (dataIndex === "datetime") {
    inputNode = <DatePicker />;
  } else if (dataIndex === "buy") {
    inputNode = (
      <Select
        defaultValue={true}
        options={[
          { value: false, label: "Sell" },
          { value: true, label: "Buy" },
        ]}
      />
    );
  } else if (dataIndex === "institution") {
    inputNode = (
      <Select placeholder="Zomato">
        {instruments.map((instrument, index) => (
          <Select.Option value={instrument?.uuid} key={index}>
            {instrument?.label}
          </Select.Option>
        ))}
      </Select>
    );
  } else {
    inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }} rules={[{ required: true, message: "" }]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TransactionTable = ({
  darkMode,
  setVisible,
  isOpen,
  selectedInstrumentIdentifier,
  updateEquityHolding,
  removeEquityHolding,
  instruments = [],
  transactions,
}) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const [data, setData] = useState([]);
  const [identifier, setIdentifier] = useState("");
  const isEditing = (record) => record.uuid === identifier;

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      if (
        selectedInstrumentIdentifier === "" ||
        selectedInstrumentIdentifier === null ||
        selectedInstrumentIdentifier === transaction?.institution?.uuid
      ) {
        return transaction;
      }
      return null;
    });

    setData(filtered);
  }, [selectedInstrumentIdentifier, transactions]);

  const columns = [
    {
      key: "institution",
      title: "Instrument",
      dataIndex: "institution",
      width: 250,
      fixed: "left",
      editable: true,
      render: (value) => value?.label,
    },
    {
      key: "datetime",
      title: "Transaction Date",
      dataIndex: "datetime",
      width: 150,
      editable: true,
    },
    {
      key: "buy",
      title: "B/S",
      dataIndex: "buy",
      width: 90,
      render: (value) => (
        <Tag color="orange" bordered={!darkMode} style={{ width: "40px", textAlign: "center" }}>
          {value ? "Buy" : "Sell"}
        </Tag>
      ),
      editable: true,
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
      render: (value) => (
        <Tag color={darkMode ? "gold" : "purple"} bordered={!darkMode} style={{ width: "70px", textAlign: "center" }}>
          {value}
        </Tag>
      ),
      editable: true,
    },
    {
      key: "average",
      title: "Average (in ₹)",
      dataIndex: "average",
      render: (value) => formatAmount(value),
      editable: true,
    },
    {
      key: "net",
      title: "Net (in ₹)",
      width: 150,
      sorter: (a, b) => a?.quantity * a?.average - b?.quantity * b?.average,
      render: (_, record) => <b>{formatAmount(record?.quantity * record?.average)}</b>,
    },
    {
      key: "uuid",
      title: "Action",
      dataIndex: "uuid",
      width: 240,
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <Space direction="horizontal" size={0}>
            {editable ? (
              <>
                <Button type="link" size="small" icon={<SaveOutlined />} onClick={() => onSave(record)}>
                  Save
                </Button>
                <Button type="link" size="small" icon={<CloseCircleOutlined />} onClick={onCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="link" size="small" icon={<EditOutlined />} onClick={() => onEdit(record)}>
                Edit
              </Button>
            )}
            <Popconfirm title="Sure to cancel?" onConfirm={() => onRemove(record)}>
              <Button type="link" size="small" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onEdit = ({ uuid, institution, quantity, average, buy, datetime }) => {
    form.setFieldsValue({ institution: institution?.uuid, quantity, average, buy, datetime: dayjs(datetime) });
    setIdentifier(uuid);
  };

  const onCancel = () => {
    // Reset the identifier
    setIdentifier("");
  };

  const onRemove = ({ uuid }) => {
    removeEquityHolding(uuid);
  };

  const onSave = async ({ uuid }) => {
    try {
      const row = await form.validateFields();
      // Update the data
      console.log(row);
      updateEquityHolding(uuid, { ...row, datetime: row.datetime?.format(dateFormat) });

      // Reset the identifier
      setIdentifier("");
    } catch (error) {}
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        title: col.title,
        dataIndex: col.dataIndex,
        editing: isEditing(record),
        instruments,
      }),
    };
  });

  return (
    <Modal title="Market Order History" open={isOpen} footer={[]} onCancel={() => setVisible(false)} width={"80%"}>
      <Row>
        <Col span={24}>
          <Form form={form} component={false}>
            <Table
              bordered
              size="small"
              rowKey="uuid"
              scroll={{ x: 1200 }}
              rowClassName="editable-row"
              components={{ body: { cell: EditableTransactionCell } }}
              dataSource={data}
              onChange={onChange}
              columns={mergedColumns}
              pagination={{
                onChange: onCancel,
              }}
            />
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(TransactionTable);
