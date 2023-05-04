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
    live: true,
    title: "Employees Provident Fund (EPF)",
    icon: <GoldOutlined className="illustration" />,
  },
  {
    key: 4,
    live: false,
    title: "Mutual Funds",
    icon: <BankOutlined className="illustration" />,
  },
  {
    key: 5,
    live: false,
    title: "G-Sec Bonds",
    icon: <RiseOutlined className="illustration" />,
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

const contributions = [
  {
    uuid: "0",
    datetime: "1/10/2023",
    employeeShare: 3900,
    employerShare: 2650,
    pensionShare: 1250,
  },
];

export { preferences, investmentClasses, contributions };
