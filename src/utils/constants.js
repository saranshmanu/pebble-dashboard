import { GoldOutlined, DollarCircleOutlined, RiseOutlined, BankOutlined, SlidersOutlined } from "@ant-design/icons";

const preferences = [
  {
    property: "investmentSummary",
    label: "Summary",
    description: "Summary",
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
    Key: "1",
    Instrument: "Zomato",
    Exchange: "NSE",
    Type: "Equity",
    Quantity: 1000,
    LTP: 58.3,
    Current: 58300,
    Net: -3400,
  },
  {
    Key: "2",
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
    Key: "1",
    Instrument: "Zomato",
    Datetime: "2023-04-23",
    Buy: true,
    Quantity: 1000,
    Average: 58.3,
    Current: 60,
    Net: 58300,
  },
  {
    Key: "2",
    Instrument: "Paytm",
    Datetime: "2023-04-23",
    Buy: true,
    Quantity: 100,
    Average: 621.3,
    Current: 688.2,
    Net: 62130,
  },
];

export { preferences, investmentClasses, equityHoldingData, equityTransactionData };
