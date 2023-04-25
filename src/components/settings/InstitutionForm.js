/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { Modal, Form, Input, Segmented, InputNumber } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createInstitution } from "../../database/actions/institution";
import { getDatabase } from "../../database";
import { createNotification } from "../../utils/commonFunctions";

const InstitutionForm = ({
  isOpen,
  onClose,
  inUpdateMode = false,
  selected,
  updatingRecord,
  updateInstitution,
  creatingRecord,
}) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const defaultLastTradingPrice = 0;
  const defaultType = "Bank";

  const populateFormFields = async () => {
    try {
      const database = await getDatabase();
      let response = await database.institution
        .findOne({
          selector: { uuid: selected },
        })
        .exec();
      response = response._data;

      form.setFieldValue("name", response?.label);
      form.setFieldValue("type", response?.type);
      form.setFieldValue("price", response?.lastTradingValue);

      setDisabled(false);
    } catch (error) {
      createNotification("Failed to fetch the record information", "error");
    }
  };

  useEffect(() => {
    if (creatingRecord || updatingRecord) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [creatingRecord, updatingRecord]);

  useEffect(() => {
    if (isOpen && inUpdateMode) {
      populateFormFields();
    }
    if (isOpen && !inUpdateMode) {
      form.setFieldValue("type", defaultType);
      form.setFieldValue("price", defaultLastTradingPrice);
    }
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen]);

  const onFormSubmit = async () => {
    try {
      await form.validateFields();
      const label = form.getFieldValue("name");
      const type = form.getFieldValue("type");
      const price = form.getFieldValue("price");

      if (inUpdateMode) updateInstitution({ type, uuid: selected, label, lastTradingValue: price });
      else createInstitution({ label, type, lastTradingValue: price });

      onClose();
    } catch (error) {}
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onFormSubmit();
    }
  };

  return (
    <Modal
      title="Institution"
      open={isOpen}
      onCancel={onClose}
      okText={inUpdateMode ? "Update" : "Create"}
      onOk={onFormSubmit}
    >
      <Form
        form={form}
        layout="vertical"
        size="default"
        requiredMark={true}
        disabled={disabled}
        onKeyUpCapture={handleKeypress}
      >
        <Form.Item
          required
          name="name"
          label="Organisation Name"
          rules={[{ required: true, message: "The field is required" }]}
          tooltip={{ title: "Organisation name of the financial institution", icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="State Bank of India" />
        </Form.Item>
        <Form.Item
          required
          name="price"
          label="Last Trading Price"
          rules={[{ required: true, message: "The field is required" }]}
          tooltip={{ title: "Last trading price of the institution", icon: <InfoCircleOutlined /> }}
        >
          <InputNumber className="full-width" placeholder={0} />
        </Form.Item>
        <Form.Item
          required
          name="type"
          label="Organisation Type"
          rules={[{ required: true, message: "The field is required" }]}
          tooltip={{ title: "Organisation type", icon: <InfoCircleOutlined /> }}
        >
          <Segmented options={["Bank", "Equity"]} defaultValue={defaultType} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  (state) => ({
    creatingRecord: state.institutions.creatingInstitutions,
  }),
  () => ({})
)(InstitutionForm);
