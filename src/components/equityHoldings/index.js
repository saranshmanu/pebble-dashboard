import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Button, Row, Typography, Divider } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined, ProfileOutlined } from "@ant-design/icons";

import {
  getEquityHoldings,
  getEquityHoldingsSummary,
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

const EquityHolding = ({ transactions, institutions = [], equitySummary }) => {
  const [defaultType, setDefaultType] = useState("Buy");
  const [selectedInstrumentIdentifier, setSelectedInstrumentIdentifier] = useState("");
  const [transactionTableModalVisible, setTransactionTableModalVisible] = useState(false);
  const [transactionFormModalVisible, setTransactionFormModalVisible] = useState(false);

  const checkIfNull = (value = 0) => {
    return value || 0;
  };

  const calculateStats = () => {
    let current = 0;
    let pnl = 0;

    for (const instrument of equitySummary) {
      current += checkIfNull(instrument?.current);
      pnl += checkIfNull(instrument?.net);
    }

    return { current, pnl };
  };

  useEffect(() => {
    getEquityHoldings();
    getEquityHoldingsSummary();
    getInstitutions();
  }, []);

  return (
    <Row gutter={[40, 0]}>
      <Col span={24}>
        <TransactionForm
          isOpen={transactionFormModalVisible}
          setVisible={setTransactionFormModalVisible}
          createEquityHolding={createEquityHolding}
          instruments={institutions}
          defaultType={defaultType}
        />
        <TransactionTable
          isOpen={transactionTableModalVisible}
          setVisible={setTransactionTableModalVisible}
          selectedInstrumentIdentifier={selectedInstrumentIdentifier}
          updateEquityHolding={updateEquityHolding}
          removeEquityHolding={removeEquityHolding}
          transactions={transactions}
          instruments={institutions}
        />
        <Button
          onClick={() => {
            setSelectedInstrumentIdentifier("");
            setTransactionTableModalVisible(true);
          }}
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
        <HoldingTable
          transactionTableVisible={setTransactionTableModalVisible}
          setSelectedInstrumentIdentifier={setSelectedInstrumentIdentifier}
          instruments={equitySummary}
        />
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
    institutions: state.institutions.institutions,
    transactions: state.holdings.equityTransactions,
    equitySummary: state.holdings.equitySummary,
  }),
  (dispatch) => ({})
)(EquityHolding);
