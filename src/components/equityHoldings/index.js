import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Button, Row, Typography, Divider } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined, ProfileOutlined } from "@ant-design/icons";

import {
  getEquityHoldings,
  createEquityHolding,
  updateEquityHolding,
  removeEquityHolding,
} from "../../database/actions/holding";
import { getInstitutions } from "../../database/actions/institution";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import HoldingTable from "./HoldingTable";
import HoldingStats from "./HoldingStats";

const { Title } = Typography;

const EquityHolding = ({ transactions, instruments = [] }) => {
  const [defaultType, setDefaultType] = useState("Buy");
  const [transactionTableModalVisible, setTransactionTableModalVisible] = useState(false);
  const [transactionFormModalVisible, setTransactionFormModalVisible] = useState(false);

  const checkIfNull = (value = 0) => {
    return value || 0;
  };

  const calculateStats = () => {
    let current = 0;
    let net = 0;

    for (const data of transactions) {
      // current += checkIfNull(data?.quantity) * checkIfNull(data?.average);
      // net +=
      //   checkIfNull(data?.quantity) * (checkIfNull(data?.institution?.lastTradingValue) - checkIfNull(data?.average));
    }

    return { current, net };
  };

  useEffect(() => {
    getEquityHoldings();
    getInstitutions();
  }, []);

  return (
    <Row gutter={[40, 0]}>
      <Col span={24}>
        <TransactionForm
          isOpen={transactionFormModalVisible}
          setVisible={setTransactionFormModalVisible}
          createEquityHolding={createEquityHolding}
          instruments={instruments}
          defaultType={defaultType}
        />
        <TransactionTable
          isOpen={transactionTableModalVisible}
          setVisible={setTransactionTableModalVisible}
          updateEquityHolding={updateEquityHolding}
          removeEquityHolding={removeEquityHolding}
          transactions={transactions}
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
          onClick={() => {
            setDefaultType("Buy");
            setTransactionFormModalVisible(true);
          }}
          style={{ marginRight: 10 }}
          icon={<PlusCircleOutlined />}
          type="primary"
          size="large"
        >
          Buy
        </Button>
        <Button
          danger
          onClick={() => {
            setDefaultType("Sell");
            setTransactionFormModalVisible(true);
          }}
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
  (state) => ({
    instruments: state.institutions.institutions,
    transactions: state.holdings.equityTransactions,
  }),
  (dispatch) => ({})
)(EquityHolding);
