import { Modal, Form, InputNumber, message } from "antd";
import { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getDatabase } from "../../database";
import { createNotification } from "../../utils/commonFunctions";
import useSettings from "../../hooks/settings";

const InvestmentProjectionForm = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [{ updatingRecord }, { updateUserSettings }] = useSettings();
  const [disabled, setDisabled] = useState(false);

  const populateFormFields = async () => {
    try {
      const database = await getDatabase();
      let response = await database.settings.find().exec();
      response = response?.[0]?._data;

      const BAR_GRAPH_DEFAULT_INVESTMENT_PROJECTION_CAP_VALUE = 10;
      const LINE_GRAPH_DEFAULT_INVESTMENT_PROJECTION_CAP_VALUE = 50;

      form.setFieldValue(
        "segregated-bar-graph",
        response?.investmentProjectionCap?.segregatedBarGraph || BAR_GRAPH_DEFAULT_INVESTMENT_PROJECTION_CAP_VALUE
      );
      form.setFieldValue(
        "line-graph",
        response?.investmentProjectionCap?.lineGraph || LINE_GRAPH_DEFAULT_INVESTMENT_PROJECTION_CAP_VALUE
      );

      setDisabled(false);
    } catch (error) {
      createNotification("Failed to populate the projection limit", "error");
    }
  };

  const onFormSubmit = async () => {
    try {
      await form.validateFields();
      const segregatedBarGraph = parseInt(form.getFieldValue("segregated-bar-graph"));
      const lineGraph = parseInt(form.getFieldValue("line-graph"));

      await updateUserSettings({
        investmentProjectionCap: {
          segregatedBarGraph,
          lineGraph,
        },
      });

      onClose();

      createNotification("Updated the projection cap value successfully", "info");
    } catch (error) {
      createNotification("Failed to update the projection cap value", "error");
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onFormSubmit();
    }
  };

  useEffect(() => {
    if (updatingRecord) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [updatingRecord]);

  useEffect(() => {
    if (isOpen) {
      populateFormFields();
    }
    if (!isOpen) {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const rules = [
    { required: true, min: 1, max: 100, type: "number", message: "The value should be between 1 and 100" },
  ];

  return (
    <Modal title="Projection Limit" open={isOpen} onCancel={onClose} okText="Update" onOk={onFormSubmit}>
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
          name="line-graph"
          label="Line Graph"
          rules={rules}
          tooltip={{ title: "Number of years for the projection calculation", icon: <InfoCircleOutlined /> }}
        >
          <InputNumber className="full-width" placeholder="50" defaultValue={50} />
        </Form.Item>
        <Form.Item
          required
          name="segregated-bar-graph"
          label="Segregated Bar Graph"
          rules={rules}
          tooltip={{ title: "Number of years for the projection calculation", icon: <InfoCircleOutlined /> }}
        >
          <InputNumber className="full-width" placeholder="10" defaultValue={10} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InvestmentProjectionForm;
