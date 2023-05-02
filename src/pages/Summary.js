/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { Tabs } from "antd";
import FixedIncomeSummary from "../components/fixedIncomeHoldings/Summary";
import EquitySummary from "../components/equityHoldings/Summary";
import EmployeeProvidentFundSummary from "../components/employeeProvidentFundHoldings/Summary";
import "../styles/Summary.scss";

function Summary() {
  return (
    <Tabs
      tabPosition="right"
      items={[
        {
          key: 1,
          label: "Fixed Income Securities",
          children: <FixedIncomeSummary />,
        },
        {
          key: 2,
          label: "Equity Holdings",
          children: <EquitySummary />,
        },
        {
          key: 3,
          label: "Employee Provident Fund",
          children: <EmployeeProvidentFundSummary />,
        },
      ]}
    />
  );
}

export default connect(
  (state) => ({}),
  () => ({})
)(Summary);
