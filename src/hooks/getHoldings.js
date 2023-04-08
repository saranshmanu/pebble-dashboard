import dayjs from "dayjs";
import { useState } from "react";
import { getDatabase } from "../database";
import { calculateFutureAmount, calculateCurrentAmount, getCompoundFrequencyType } from "../utils/commonFunctions";

const useGetHoldings = () => {
  const [holdingStats, setHoldingStats] = useState({
    averageInterestRate: 0,
    accumulatedInterest: 0,
    totalInvestment: 0,
    netAmount: 0,
  });
  const [holdingData, setHoldingData] = useState([]);
  const [holdingProjection, setHoldingProjection] = useState([]);
  const [holdingDistribution, setHoldingDistribution] = useState([]);

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
    console.log(plotData);
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
    let holdings = await database.investments.find().exec();

    holdings = holdings.map((holding) => {
      const record = holding._data;

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
        duration: record?.duration,
        institution: record?.institution,
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

  return [{ holdingProjection, holdingStats, holdingData, holdingDistribution }, refresh];
};

export default useGetHoldings;
