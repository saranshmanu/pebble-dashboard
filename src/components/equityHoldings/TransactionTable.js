import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row, Table, Tag, Button, Space, Modal, Popconfirm } from "antd";
import { Form, InputNumber, Input, DatePicker, Select } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { equityTransactionData } from "../../utils/constants";
import { formatAmount } from "../../utils/commonFunctions";

const EditableTransactionCell = ({ instruments, editing, dataIndex, title, record, index, children, ...restProps }) => {
  let inputNode;

  if (dataIndex === "Quantity" || dataIndex === "Average") {
    inputNode = <InputNumber />;
  } else if (dataIndex === "Datetime") {
    inputNode = <DatePicker />;
  } else if (dataIndex === "Buy") {
    inputNode = (
      <Select
        defaultValue={true}
        options={[
          { value: false, label: "Sell" },
          { value: true, label: "Buy" },
        ]}
      />
    );
  } else if (dataIndex === "Instrument") {
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

const TransactionTable = ({ darkMode, setVisible, isOpen, instruments = [] }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [identifier, setIdentifier] = useState("");
  const isEditing = (record) => record.Key === identifier;

  useEffect(() => {
    setData([...equityTransactionData]);
  }, []);

  const columns = [
    {
      key: "Instrument",
      title: "Instrument",
      dataIndex: "Instrument",
      width: 150,
      fixed: "left",
      editable: true,
    },
    {
      key: "Datetime",
      title: "Transaction Date",
      dataIndex: "Datetime",
      width: 150,
      editable: true,
    },
    {
      key: "Type",
      title: "B/S",
      dataIndex: "Buy",
      width: 90,
      render: (value) => (
        <Tag color="orange" bordered={!darkMode} style={{ width: "40px", textAlign: "center" }}>
          {value ? "Buy" : "Sell"}
        </Tag>
      ),
      editable: true,
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
      editable: true,
    },
    {
      key: "Average",
      title: "Average (in ₹)",
      dataIndex: "Average",
      render: (value) => formatAmount(value),
      editable: true,
    },
    {
      key: "Net",
      title: "Net (in ₹)",
      dataIndex: "Net",
      sorter: (a, b) => a.Net - b.Net,
      render: (value) => <b>{formatAmount(value)}</b>,
    },
    {
      key: "uuid",
      title: "Action",
      dataIndex: "Key",
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

  const onEdit = ({ Key, Instrument, Quantity, Average, Buy, Datetime }) => {
    form.setFieldsValue({ Instrument, Quantity, Average, Buy, Datetime: dayjs(Datetime) });
    setIdentifier(Key);
  };

  const onCancel = () => {
    setIdentifier("");
  };

  const onRemove = ({ Key }) => {
    // Delete the data
  };

  const onSave = async ({ Key }) => {
    try {
      const row = await form.validateFields();
      // Update the data
      console.log(row);

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
              rowKey="Key"
              scroll={{ x: 1000 }}
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
