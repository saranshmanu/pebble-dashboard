import { Typography, Divider } from "antd";
import { BankOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SummaryCard = ({ data }) => {
  return (
    <div className="information-card summary-card">
      <div className="card-body">
        <div style={{ margin: "0px 0px 40px 0px", fontSize: "30px" }}>
          <BankOutlined />
        </div>
        <div>
          <Title level={5} style={{ margin: 0 }}>
            {"Invested Amount"}
          </Title>
          <Title level={3} style={{ margin: 0 }}>
            {data?.invested || "₹0"}
          </Title>
          <div style={{ marginBottom: 10 }} />
          <Title level={5} style={{ margin: 0 }}>
            {"Accumulated Interest"}
          </Title>
          <Title level={3} style={{ margin: 0 }}>
            {data?.accumulated || "₹0"}
          </Title>
          <Divider style={{ margin: "10px 0px" }} />
          <Title level={2} style={{ margin: 0 }}>
            = {data?.net || "₹0"}
          </Title>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
