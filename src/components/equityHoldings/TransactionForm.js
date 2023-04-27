import { useEffect } from "react";
import { v4 } from "uuid";
import { Col, Row, Modal, Form, InputNumber, DatePicker, Select, Segmented } from "antd";

const TransactionForm = ({ isOpen, setVisible, instruments = [], createEquityHolding, defaultType }) => {
  const [form] = Form.useForm();

  const dateFormat = "YYYY/MM/DD";
  const resetField = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({ type: defaultType });
    } else {
      resetField();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onFormSubmit = async () => {
    try {
      await form.validateFields();

      const values = form.getFieldsValue();
      const payload = {
        uuid: v4(),
        institution: values["instrument"],
        buy: values["type"] === "Buy",
        datetime: values["datetime"]?.format(dateFormat),
        quantity: values["quantity"],
        average: values["average"],
      };

      createEquityHolding(payload);

      setVisible(false);
    } catch (error) {}
  };

  const onFormCancel = () => {
    setVisible(false);
    resetField();
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onFormSubmit();
    }
  };

  return (
    <Modal title="Transaction" open={isOpen} onCancel={onFormCancel} onOk={onFormSubmit} width={"80%"} okText="Save">
      <Row>
        <Col span={24}>
          <Form
            form={form}
            className="full-width"
            onKeyUpCapture={handleKeypress}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            size="default"
          >
            <Form.Item
              required
              name="instrument"
              label="Instrument"
              rules={[{ required: true, message: "Instrument is required" }]}
            >
              <Select placeholder="Zomato">
                {instruments.map((instrument, index) => (
                  <Select.Option value={instrument?.uuid} key={index}>
                    {instrument?.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              required
              tooltip="Type of transaction."
              name="type"
              label="Type"
              rules={[{ required: true, message: "Transaction type is required" }]}
            >
              <Segmented size="large" options={["Buy", "Sell"]} />
            </Form.Item>
            <Form.Item
              required
              tooltip="Mean price of all the stock units bought or sold."
              name="average"
              label="Average Buy Value (in ₹)"
              rules={[{ required: true, message: "Average buy value is required" }]}
            >
              <InputNumber className="full-width" placeholder="64.17" />
            </Form.Item>
            <Form.Item
              required
              tooltip="Total units of stocks bought or sold."
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: "Quantity is required" }]}
            >
              <InputNumber className="full-width" placeholder="1000" />
            </Form.Item>
            <Form.Item
              required
              tooltip="Date on which transaction was executed."
              name="datetime"
              label="Date"
              rules={[{ required: true, message: "Date is required" }]}
            >
              <DatePicker className="full-width" format={dateFormat} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default TransactionForm;
