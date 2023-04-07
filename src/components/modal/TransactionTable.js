import { Modal, Table } from "antd";
import { getDatabase } from "../../database";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Institution",
    dataIndex: "institution",
    fixed: "left",
    width: 200,
  },
  {
    title: "Principal",
    dataIndex: "principal",
    sorter: {
      compare: (a, b) => parseFloat(a?.principal) - parseFloat(b?.principal),
      multiple: 1,
    },
  },
  {
    title: "Interest Rate (in %)",
    dataIndex: "interestRate",
    sorter: {
      compare: (a, b) => parseFloat(a?.interestRate) - parseFloat(b?.interestRate),
      multiple: 1,
    },
  },
  {
    title: "Date",
    dataIndex: "investmentDate",
  },
  {
    title: "Compound Frequency",
    dataIndex: "compoundFrequency",
  },
  {
    title: "Duration (in days)",
    dataIndex: "duration",
    sorter: {
      compare: (a, b) => parseFloat(a?.duration) - parseFloat(b?.duration),
      multiple: 1,
    },
  },
  {
    title: "Current Value",
    dataIndex: "currentValue",
    sorter: {
      compare: (a, b) => parseFloat(a?.currentValue) - parseFloat(b?.currentValue),
      multiple: 1,
    },
  },
  {
    title: "Maturity Amount",
    dataIndex: "maturityAmount",
    sorter: {
      compare: (a, b) => parseFloat(a?.maturityAmount) - parseFloat(b?.maturityAmount),
      multiple: 1,
    },
  },
  {
    title: "Interest to be earned",
    dataIndex: "remainingInterest",
    sorter: {
      compare: (a, b) => parseFloat(a?.remainingInterest) - parseFloat(b?.remainingInterest),
      multiple: 1,
    },
  },
];

const calculateCurrentAmount = (principal = 0, interest = 0, frequency = 1, investmentDate = "") => {
  const today = new Date().getTime();
  const date = new Date(investmentDate).getTime();
  const duration = (today - date) / (24 * 60 * 60 * 1000);
  return principal * Math.pow(1 + interest / ((12 / frequency) * 100), ((12 / frequency) * duration) / 365);
};

const calculateMaturityAmount = (principal = 0, interest = 0, duration = 0, frequency = 1) => {
  return principal * Math.pow(1 + interest / ((12 / frequency) * 100), ((12 / frequency) * duration) / 365);
};

const getCompoundFrequencyType = (frequency = 1) => {
  const frequencyMap = {
    1: "Monthly",
    4: "Quaterly",
    6: "Semiannually",
    12: "Annually",
  };
  return frequencyMap[frequency] || 12;
};

const TransactionTable = ({ isModalOpen, setModalStatus }) => {
  const [holdingData, setHoldingData] = useState([]);

  const refresh = async () => {
    const database = await getDatabase();
    let holdings = await database.investments.find().exec();
    holdings = holdings.map((holding) => {
      const record = holding._data;
      const maturityAmount = calculateMaturityAmount(
        record?.principal,
        record?.interestRate,
        record?.duration,
        record?.compoundFrequency
      )?.toFixed(2);
      const currentValue = calculateCurrentAmount(
        record?.principal,
        record?.interestRate,
        record?.compoundFrequency,
        record?.investmentDatetime
      )?.toFixed(2);
      return {
        duration: record?.duration,
        institution: record?.institution,
        interestRate: record?.interestRate,
        principal: record?.principal,
        investmentDate: record?.investmentDatetime,
        compoundFrequency: getCompoundFrequencyType(record?.compoundFrequency),
        maturityAmount,
        currentValue,
        remainingInterest: (maturityAmount - currentValue)?.toFixed(2),
      };
    });
    setHoldingData(holdings);
  };

  useEffect(() => {
    if (isModalOpen === true) {
      refresh();
    }
  }, [isModalOpen]);

  useEffect(() => {
    refresh();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Modal
      size="small"
      title="Holdings"
      width={"800px"}
      style={{ top: 20 }}
      open={isModalOpen}
      footer={null}
      onCancel={() => setModalStatus(false)}
    >
      <div>
        <Table size="small" columns={columns} dataSource={holdingData} onChange={onChange} scroll={{ x: 1000 }} />
      </div>
    </Modal>
  );
};
export default TransactionTable;
