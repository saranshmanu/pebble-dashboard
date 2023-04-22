import { Col, Button, Row, Typography, Divider } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined, ProfileOutlined } from "@ant-design/icons";
import HoldingTable from "./HoldingTable";
import TransactionTable from "./TransactionTable";
import HoldingStats from "./HoldingStats";
import { useState } from "react";

const { Title } = Typography;

const EquityHolding = () => {
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);

  return (
    <Row gutter={[40, 0]}>
      <Col span={24}>
        <TransactionTable isOpen={transactionModalVisible} setVisible={setTransactionModalVisible} />
        <Button
          onClick={() => setTransactionModalVisible(true)}
          style={{ marginRight: 10 }}
          icon={<ProfileOutlined />}
          type="primary"
          size="large"
        >
          Transactions
        </Button>
        <Button
          onClick={() => {}}
          style={{ marginRight: 10 }}
          icon={<PlusCircleOutlined />}
          type="primary"
          size="large"
        >
          Buy
        </Button>
        <Button
          danger
          onClick={() => {}}
          style={{ marginRight: 10 }}
          icon={<MinusCircleOutlined />}
          type="primary"
          size="large"
        >
          Sell
        </Button>
      </Col>
      <Col span={24}>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <Title level={3} style={{ paddingTop: 0 }}>
          Position
        </Title>
        <HoldingTable />
      </Col>
      <Col span={24}>
        <Divider style={{ marginTop: 10 }} />
        <HoldingStats />
        <Divider />
      </Col>
    </Row>
  );
};

export default EquityHolding;
