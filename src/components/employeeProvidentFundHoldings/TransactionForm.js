/* eslint-disable react-hooks/exhaustive-deps */
import { v4 } from "uuid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DatePicker, Form, InputNumber, Modal } from "antd";
import { getDatabase } from "../../database";
import { createNotification } from "../../utils/commonFunctions";

const TransactionForm = ({
  isModalOpen,
  setModalStatus,
  createTransaction,
  updateTransaction,
  updateMode = false,
  identifier = "",
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
      let transaction = await database.employeeProvidentFund
        .findOne({
          selector: { uuid: identifier },
        })
        .exec();
      transaction = transaction._data;

      form.setFieldsValue({
        "employee-share": transaction?.employeeShare,
        "employer-share": transaction?.employerShare,
        "pension-share": transaction?.pensionShare,
        "time-period": dayjs(transaction?.datetime, dateFormat),
      });

      setDisabled(false);
    } catch (error) {
      createNotification("Failed to fetch the record information", "error");
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
        employeeShare: values["employee-share"],
        employerShare: values["employer-share"],
        pensionShare: values["pension-share"],
        datetime: datetime?.format(dateFormat),
      };

      if (!updateMode) createTransaction(payload);
      else updateTransaction(identifier, payload);

      setModalStatus(false);
    } catch (error) {}
  };

  const onFormCancel = () => {
    setModalStatus(false);
    resetField();
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onFormSubmit();
    }
  };

  return (
    <Modal
      size="small"
      width={"800px"}
      style={{ top: 20 }}
      title="Contribution"
      open={isModalOpen}
      onOk={onFormSubmit}
      onCancel={onFormCancel}
      okText={updateMode ? "Update" : "Create"}
    >
      <div style={{ padding: "30px 0px" }}>
        <Form
          className="full-width"
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
          layout="horizontal"
          size="default"
          disabled={disabled}
          onKeyUpCapture={handleKeypress}
        >
          <Form.Item
            required
            tooltip="Contribution made by the employee working at the firm."
            name="employee-share"
            label="Employee Contribution"
            rules={[{ required: true, message: "Employee Contribution field is required" }]}
          >
            <InputNumber className="full-width" placeholder="3900" />
          </Form.Item>
          <Form.Item
            required
            tooltip="Contribution made by the employer."
            name="employer-share"
            label="Employer Contribution"
            rules={[{ required: true, message: "Employer Contribution field is required" }]}
          >
            <InputNumber className="full-width" placeholder="2650" />
          </Form.Item>
          <Form.Item
            required
            tooltip="Amount contributed towards pension."
            name="pension-share"
            label="Pension Contribution"
            rules={[{ required: true, message: "Pension Contribution field is required" }]}
          >
            <InputNumber className="full-width" placeholder="1250" />
          </Form.Item>
          <Form.Item
            required
            tooltip="Period for which the contributions are made."
            name="time-period"
            label="Time Period"
            rules={[{ required: true, message: "Contribution period is required" }]}
          >
            <DatePicker className="full-width" format={dateFormat} picker="month" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default TransactionForm;
