import { useState } from "react";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { DatePicker, Form, Input, InputNumber, Radio, Modal } from "antd";
import { getDatabase } from "../../database";

const { RangePicker } = DatePicker;

const CreateHoldingModal = ({ isModalOpen, setModalStatus }) => {
  const dateFormat = "YYYY/MM/DD";

  const [compoundFrequency, setCompoundFrequency] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(null);
  const [interestRate, setInterestRate] = useState(null);
  const [institution, setInstitution] = useState(null);
  const [timePeriod, setTimePeriod] = useState([]);

  const resetField = () => {
    setCompoundFrequency(null);
    setInvestmentAmount(null);
    setInterestRate(null);
    setInstitution(null);
    setTimePeriod(null);
  };
  const onFormSubmit = async () => {
    const database = await getDatabase();
    const payload = {
      uuid: v4(),
      institution,
      interestRate,
      compoundFrequency,
      principal: investmentAmount,
      investmentDatetime: timePeriod?.[0]?.format(dateFormat),
      duration: (timePeriod?.[1] - timePeriod?.[0]) / (24 * 3600 * 1000),
    };
    await database.investments.insert(payload);
    setModalStatus(false);
  };
  const onFormCancel = () => {
    setModalStatus(false);
    resetField();
  };
  return (
    <Modal
      size="small"
      title="Investment"
      width={"800px"}
      onCancel={onFormCancel}
      okText="Create"
      onOk={onFormSubmit}
      style={{ top: 20 }}
      open={isModalOpen}
    >
      <div style={{ padding: "30px 0px" }}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          size="default"
          style={{ width: "100%" }}
        >
          <Form.Item label="Compound Frequency" rules={[{ required: true }]}>
            <Radio.Group
              defaultValue="Annually"
              value={compoundFrequency}
              onChange={(env) => {
                setCompoundFrequency(env.target.value);
              }}
            >
              <Radio.Button value={12}>Annually</Radio.Button>
              <Radio.Button value={6}>Semiannually</Radio.Button>
              <Radio.Button value={4}>Quaterly</Radio.Button>
              <Radio.Button value={1}>Monthly</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Financial Institution" rules={[{ required: true }]}>
            <Input
              placeholder="State Bank of India"
              value={institution}
              onChange={(env) => setInstitution(env.currentTarget.value)}
            />
          </Form.Item>
          <Form.Item label="Investment Duration" rules={[{ required: true }]}>
            <RangePicker
              style={{ width: "100%" }}
              format={dateFormat}
              value={timePeriod}
              onCalendarChange={(value) => {
                setTimePeriod([dayjs(value[0], dateFormat), dayjs(value[1], dateFormat)]);
              }}
            />
          </Form.Item>
          <Form.Item label="Estimated Interest Date" rules={[{ required: true }]}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="9.00"
              value={interestRate}
              onChange={(value) => setInterestRate(value)}
            />
          </Form.Item>
          <Form.Item label="Initial Investment" rules={[{ required: true }]}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="100,000"
              value={investmentAmount}
              onChange={(value) => setInvestmentAmount(value)}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateHoldingModal;
