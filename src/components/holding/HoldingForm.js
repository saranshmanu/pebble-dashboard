/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { DatePicker, Form, Select, InputNumber, Radio, Modal, message } from "antd";
import { getDatabase } from "../../database";

const { RangePicker } = DatePicker;
const { Option } = Select;

const HoldingForm = ({
  isModalOpen,
  setModalStatus,
  createHolding,
  updateHolding,
  updateMode = false,
  identifier = "",
  institutions = [],
}) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  const dateFormat = "YYYY/MM/DD";
  const resetField = () => {
    form.resetFields();
  };

  const populateFormFields = async () => {
    try {
      const database = await getDatabase();
      let holding = await database.investments
        .findOne({
          selector: { uuid: identifier },
        })
        .exec();
      holding = holding._data;

      form.setFieldValue("investment-amount", holding?.principal);
      form.setFieldValue("financial-institution", holding?.institution);
      form.setFieldValue("compound-frequency", holding?.compoundFrequency);
      form.setFieldValue("interest-rate", holding?.interestRate);
      form.setFieldValue("time-period", [
        dayjs(holding?.investmentDatetime, dateFormat),
        dayjs(holding?.investmentDatetime, dateFormat).add(holding?.duration, "d"),
      ]);

      setDisabled(false);
    } catch (error) {
      message.error("Failed to fetch the record information");
    }
  };

  useEffect(() => {
    resetField();
    if (isModalOpen) {
      setDisabled(false);
    }
    if (isModalOpen && updateMode) {
      setDisabled(true);
      populateFormFields();
    }
  }, [isModalOpen]);

  const onFormSubmit = async () => {
    try {
      await form.validateFields();

      const values = form.getFieldsValue();
      const datetime = values["time-period"];
      const payload = {
        uuid: v4(),
        principal: values["investment-amount"],
        institution: values["financial-institution"],
        interestRate: values["interest-rate"],
        compoundFrequency: values["compound-frequency"],
        investmentDatetime: datetime?.[0]?.format(dateFormat),
        duration: (datetime?.[1] - datetime?.[0]) / (24 * 3600 * 1000),
      };

      if (!updateMode) createHolding(payload);
      else updateHolding(identifier, payload);

      setModalStatus(false);
    } catch (error) {}
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
      okText={updateMode ? "Update" : "Create"}
      onOk={onFormSubmit}
      style={{ top: 20 }}
      open={isModalOpen}
    >
      <div style={{ padding: "30px 0px" }}>
        <Form
          className="full-width"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          size="default"
          disabled={disabled}
        >
          <Form.Item
            required
            tooltip="The principal amount is the original amount of investment made into an asset, such as a stock or fixed income asssets."
            name="investment-amount"
            label="Investment Amount"
            rules={[{ required: true, message: "Initial investment amount field is required" }]}
          >
            <InputNumber className="full-width" placeholder="100,000" />
          </Form.Item>
          <Form.Item
            required
            tooltip="A financial institution (FI) is a company engaged in the business of dealing with financial and monetary transactions such as deposits, loans, investments, and currency exchange."
            name="financial-institution"
            label="Financial Institution"
            rules={[{ required: true, message: "Financial Institution is required" }]}
          >
            <Select placeholder="State Bank of India">
              {institutions.map((institution, index) => (
                <Option value={institution?.uuid} key={index}>
                  {institution?.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            required
            tooltip="Period for which the principal amount is invested with the financial institution."
            name="time-period"
            label="Time Period"
            rules={[{ required: true, message: "Investment duration is required" }]}
          >
            <RangePicker className="full-width" format={dateFormat} />
          </Form.Item>
          <Form.Item
            required
            tooltip="An interest rate is the amount of interest due per period, as a proportion of the amount lent, deposited, or borrowed."
            name="interest-rate"
            label="Interest Rate"
            rules={[{ required: true, message: "Investment rate is required" }]}
          >
            <InputNumber className="full-width" placeholder="9.00" />
          </Form.Item>
          <Form.Item
            required
            tooltip="The compounding frequency is the number of times per year (or rarely, another unit of time) the accumulated interest is paid out, or capitalized (credited to the account), on a regular basis. "
            name="compound-frequency"
            label="Compound Frequency"
            rules={[{ required: true, message: "Compound Frequency is required" }]}
          >
            <Radio.Group>
              <Radio.Button value={12}>Annually</Radio.Button>
              <Radio.Button value={6}>Semiannually</Radio.Button>
              <Radio.Button value={4}>Quaterly</Radio.Button>
              <Radio.Button value={1}>Monthly</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default HoldingForm;
