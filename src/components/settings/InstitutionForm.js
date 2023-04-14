/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Form, Input, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useInstitution from "../../hooks/institution";
import { getDatabase } from "../../database";

const InstitutionForm = ({ isOpen, onClose, inUpdateMode = false, selected, updatingRecord, updateInstitution }) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [{ creatingRecord }, { createInstitution }] = useInstitution();

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

      setDisabled(false);
    } catch (error) {
      message.error("Failed to fetch the record information");
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
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen]);

  const onFormSubmit = async () => {
    try {
      await form.validateFields();
      const label = form.getFieldValue("name");

      if (inUpdateMode)
        updateInstitution({
          uuid: selected,
          label,
        });
      else createInstitution({ label });

      onClose();
    } catch (error) {}
  };

  return (
    <Modal
      title="Institution"
      open={isOpen}
      onCancel={onClose}
      okText={inUpdateMode ? "Update" : "Create"}
      onOk={onFormSubmit}
    >
      <Form form={form} layout="vertical" size="default" requiredMark={true} disabled={disabled}>
        <Form.Item
          required
          name="name"
          label="Organisation Name"
          rules={[{ required: true, message: "The field is required" }]}
          tooltip={{ title: "Organisation name of the financial institution", icon: <InfoCircleOutlined /> }}
        >
          <Input placeholder="State Bank of India" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InstitutionForm;
