/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { Modal, Form, Input } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useInstitution from "../../hooks/institution";
import { getDatabase } from "../../database";
import { createNotification } from "../../utils/commonFunctions";

const InstitutionForm = ({ isOpen, onClose, inUpdateMode = false, selected, updatingRecord, updateInstitution, creatingRecord }) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [{ createInstitution }] = useInstitution();

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
