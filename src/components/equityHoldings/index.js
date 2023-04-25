import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Button, Row, Typography, Divider } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined, ProfileOutlined } from "@ant-design/icons";

import { getInstitutions } from "../../database/actions/institution";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import HoldingTable from "./HoldingTable";
import HoldingStats from "./HoldingStats";
import { equityTransactionData } from "../../utils/constants";

const { Title } = Typography;

const EquityHolding = ({ instruments = [] }) => {
  const [transactionTableModalVisible, setTransactionTableModalVisible] = useState(false);
  const [transactionFormModalVisible, setTransactionFormModalVisible] = useState(false);

  const calculateStats = () => {
    let current = 0;
    let net = 0;

    for (const data of equityTransactionData) {
      current += data?.Quantity * data?.Average;
      net += data?.Quantity * (data?.Current - data?.Average);
    }

    return { current, net };
  };

  useEffect(() => {
    getInstitutions();
  }, []);

  return (
    <Row gutter={[40, 0]}>
      <Col span={24}>
        <TransactionForm
          isOpen={transactionFormModalVisible}
          setVisible={setTransactionFormModalVisible}
          instruments={instruments}
        />
        <TransactionTable
          isOpen={transactionTableModalVisible}
          setVisible={setTransactionTableModalVisible}
          instruments={instruments}
        />
        <Button
          onClick={() => setTransactionTableModalVisible(true)}
          style={{ marginRight: 10 }}
          icon={<ProfileOutlined />}
          type="primary"
          size="large"
        >
          Transactions
        </Button>
        <Button
          onClick={() => setTransactionFormModalVisible(true)}
          style={{ marginRight: 10 }}
          icon={<PlusCircleOutlined />}
          type="primary"
          size="large"
        >
          Buy
        </Button>
        <Button
          danger
          onClick={() => setTransactionFormModalVisible(true)}
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
        <HoldingTable transactionTableVisible={setTransactionTableModalVisible} />
      </Col>
      <Col span={24}>
        <Divider style={{ marginTop: 10 }} />
        <HoldingStats data={calculateStats()} />
        <Divider />
      </Col>
    </Row>
  );
};

export default connect(
  (state) => ({ instruments: state.institutions.institutions }),
  (dispatch) => ({})
)(EquityHolding);
