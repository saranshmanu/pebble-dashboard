import { GoldOutlined, DollarCircleOutlined, RiseOutlined, BankOutlined, SlidersOutlined } from "@ant-design/icons";

const preferences = [
  {
    property: "investmentSummary",
    label: "Summary",
    description: "Summary",
  },
  {
    property: "interestRate",
    label: "Interest Rate",
    description: "Interest Rate",
  },
  {
    property: "distributionGraph",
    label: "Distribution Graph",
    description: "Distribution Graph",
  },
  {
    property: "projectionGraph",
    label: "Investment Projection",
    description: "Investment Projection",
  },
];

const investmentClasses = [
  {
    key: 1,
    live: true,
    title: "Fixed Income Securities",
    icon: <DollarCircleOutlined className="illustration" />,
  },
  {
    key: 2,
    live: true,
    title: "Equity Holdings",
    icon: <SlidersOutlined className="illustration" />,
  },
  {
    key: 3,
    live: false,
    title: "Mutual Funds",
    icon: <BankOutlined className="illustration" />,
  },
  {
    key: 4,
    live: false,
    title: "G-Sec Bonds",
    icon: <RiseOutlined className="illustration" />,
  },
  {
    key: 5,
    live: false,
    title: "Employees Provident Fund (EPF)",
    icon: <GoldOutlined className="illustration" />,
  },
  {
    key: 6,
    live: false,
    title: "Public Provident Fund (PPF)",
    icon: <GoldOutlined className="illustration" />,
  },
  {
    key: 7,
    live: false,
    title: "National Pension Scheme (NPS)",
    icon: <GoldOutlined className="illustration" />,
  },
];

const equityHoldingData = [
  {
    Instrument: "Zomato",
    Exchange: "NSE",
    Type: "Equity",
    Quantity: 1000,
    LTP: 58.3,
    Current: 58300,
    Net: -3400,
  },
  {
    Instrument: "Patym",
    Exchange: "NSE",
    Type: "Equity",
    Quantity: 100,
    LTP: 521.3,
    Current: 52130,
    Net: 3400,
  },
];

const equityTransactionData = [
  {
    Instrument: "Zomato",
    Date: new Date().toDateString(),
    Buy: false,
    Quantity: 1000,
    Average: 58.3,
    Net: 58300,
  },
];

export { preferences, investmentClasses, equityHoldingData, equityTransactionData };
