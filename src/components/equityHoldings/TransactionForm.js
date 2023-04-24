import { Col, Row, Modal, Form, InputNumber, DatePicker, Select, Segmented } from "antd";

const TransactionForm = ({ isOpen, setVisible, instruments = [] }) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";

  return (
    <Modal title="Transaction" open={isOpen} onCancel={() => setVisible(false)} width={"80%"} okText="Save">
      <Row>
        <Col span={24}>
          <Form
            className="full-width"
            form={form}
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
              name="date"
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
