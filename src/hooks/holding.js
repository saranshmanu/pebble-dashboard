import dayjs from "dayjs";
import { v4 } from "uuid";
import { message } from "antd";
import { useState } from "react";
import { getDatabase } from "../database";
import { calculateFutureAmount, calculateCurrentAmount, getCompoundFrequencyType } from "../utils/commonFunctions";

const useHolding = () => {
  const [holdingStats, setHoldingStats] = useState({
    averageInterestRate: 0,
    accumulatedInterest: 0,
    totalInvestment: 0,
    netAmount: 0,
  });
  const [holdingData, setHoldingData] = useState([]);
  const [holdingProjection, setHoldingProjection] = useState([]);
  const [holdingDistribution, setHoldingDistribution] = useState([]);

  const [updatingRecord, setUpdatingRecordStatus] = useState(false);
  const [removingRecord, setRemovingRecordStatus] = useState(false);
  const [creatingRecord, setCreatingRecordStatus] = useState(false);

  const refreshHoldingDistribution = async (holdings) => {
    const distribution = {};

    for (const holding of holdings) {
      const institution = holding?.institution;
      if (!distribution[institution]) {
        distribution[institution] = parseFloat(holding?.currentValue || 0);
      } else {
        distribution[institution] += parseFloat(holding?.currentValue || 0);
      }
    }

    const plotData = [];
    for (const institution of Object.keys(distribution)) {
      plotData.push({
        name: institution,
        value: distribution[institution],
      });
    }
    setHoldingDistribution(plotData);
  };

  const calculateProjection = (holdings, date) => {
    let projection = 0;

    for (const holding of holdings) {
      const duration = (dayjs(date) - dayjs(holding?.investmentDatetime)) / (24 * 60 * 60 * 1000);
      const amount = calculateFutureAmount(
        holding?.principal,
        holding?.interestRate,
        duration,
        holding?.compoundFrequency
      );
      projection += amount;
    }
    return projection?.toFixed(2);
  };

  const refreshHoldingProjection = async () => {
    const database = await getDatabase();
    if (!database.investments) {
      console.warn("Database instance cannot be found");
      return;
    }
    let holdings = await database.investments.find().exec();
    holdings = holdings.map((holding) => holding._data);

    const duration = 30;
    const today = dayjs();

    const periods = [];
    const projections = [];
    for (let i = 1; i <= duration; i += 1) {
      const futureDate = today.add(i, "month");
      periods.push(futureDate.format("DD/MM/YY"));

      const projection = calculateProjection(holdings, futureDate);
      projections.push(projection);
    }

    const plottingData = [];
    for (let i = 0; i < periods.length; i += 1) {
      plottingData.push({
        Period: periods[i],
        Amount: projections[i],
      });
    }

    setHoldingProjection(plottingData);
  };

  const refreshHoldingStats = async (holdings) => {
    let payload = {
      averageInterestRate: 0,
      totalInvestment: 0,
      accumulatedInterest: 0,
      netAmount: 0,
    };

    for (const element of holdings) {
      const principal = parseFloat(element.principal);
      const interest = parseFloat(element.currentValue) - principal;
      const rate = parseFloat(element.interestRate);

      payload.totalInvestment += principal;
      payload.accumulatedInterest += interest;
      payload.averageInterestRate += rate * principal;
    }
    payload.netAmount = payload.totalInvestment + payload.accumulatedInterest;
    payload.averageInterestRate /= payload.totalInvestment;

    setHoldingStats(payload);
  };

  const refreshHoldingData = async () => {
    const database = await getDatabase();
    if (!database.investments) {
      console.warn("Database instance cannot be found");
      return;
    }
    let holdings = await database.investments.find().exec();

    let response = [];
    for (const holding of holdings) {
      const institution = await holding.populate("institution");
      response.push({ ...holding._data, institution: institution._data });
    }

    holdings = response.map((record) => {
      const maturityAmount = calculateFutureAmount(
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
        uuid: record?.uuid,
        duration: record?.duration,
        institution: record?.institution?.label,
        interestRate: record?.interestRate,
        principal: record?.principal,
        investmentDate: record?.investmentDatetime,
        compoundFrequency: getCompoundFrequencyType(record?.compoundFrequency),
        maturityAmount: maturityAmount,
        currentValue: currentValue,
        remainingInterest: (maturityAmount - currentValue)?.toFixed(2),
      };
    });

    setHoldingData(holdings);
    refreshHoldingStats(holdings);
    refreshHoldingProjection();
    refreshHoldingDistribution(holdings);
  };

  const refresh = async () => {
    await refreshHoldingData();
  };

  const updateHolding = async (uuid, payload) => {
    try {
      setUpdatingRecordStatus(true);
      const database = await getDatabase();
      let holding = await database.investments
        .findOne({
          selector: { uuid },
        })
        .exec();
      delete payload.uuid;
      await holding.patch({ ...payload });

      message.success("Updated the investment record!");
    } catch (error) {
      message.error("Failed to update the investment record");
    }

    setUpdatingRecordStatus(false);
  };

  const deleteHolding = async (uuid) => {
    try {
      setRemovingRecordStatus(true);
      const database = await getDatabase();
      let holding = await database.investments
        .findOne({
          selector: { uuid },
        })
        .exec();
      await holding.remove();

      message.success("Removed the investment record!");
    } catch (error) {
      message.error("Failed to remove the investment record");
    }

    setRemovingRecordStatus(false);
  };

  const createHolding = async (payload) => {
    try {
      setCreatingRecordStatus(true);
      const database = await getDatabase();
      await database.investments.insert(payload);

      message.success("Created the investment record successfully");
    } catch (error) {
      message.error("Failed to create investment record");
    }

    setCreatingRecordStatus(false);
  };

  const replicateHolding = async (uuid) => {
    try {
      setCreatingRecordStatus(true);
      const database = await getDatabase();
      const holding = await database.investments
        .findOne({
          selector: { uuid },
        })
        .exec();
      await database.investments.insert({
        ...holding._data,
        uuid: v4(),
      });

      message.success("Replicated the investment record successfully");
    } catch (error) {
      message.error("Failed to replicate investment record");
    }

    setCreatingRecordStatus(false);
  };

  return [
    {
      updatingRecord,
      removingRecord,
      creatingRecord,
      holdingProjection,
      holdingStats,
      holdingData,
      holdingDistribution,
    },
    { updateHolding, deleteHolding, createHolding, replicateHolding, refresh },
  ];
};

export default useHolding;
