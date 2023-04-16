import dayjs from "dayjs";
import { v4 } from "uuid";
import { useState } from "react";
import { getDatabase } from "../database";
import {
  calculateDateDifference,
  calculateFutureAmount,
  calculateCurrentAmount,
  getCompoundFrequencyType,
  createNotification,
} from "../utils/commonFunctions";

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

    const data = [];
    for (const institution of Object.keys(distribution)) {
      data.push({
        name: institution,
        value: parseFloat(distribution[institution]?.toFixed(2)),
      });
    }
    setHoldingDistribution(data);
  };

  const refreshHoldingProjection = async () => {
    const database = await getDatabase();
    let holdings = await database.investments.find().exec();
    holdings = holdings.map((holding) => holding._data);

    // Number of years for which projection is to be calculated
    const duration = 50;

    const projections = [];
    for (let i = 0; i <= duration; i += 1) {
      const today = dayjs().startOf("day");
      const future = today.add(i, "year");

      // Iterate over all the holdings and sumup to calculation projection
      let invested = 0;
      let projection = 0;
      for (const holding of holdings) {
        const duration = calculateDateDifference(holding?.investmentDatetime, future);

        const amount = calculateFutureAmount(
          holding?.principal,
          holding?.interestRate,
          Math.abs(duration),
          holding?.compoundFrequency
        );
        projection += amount;
        invested += holding?.principal;
      }

      // Create custom map for plotting line graph
      projections.push({
        value: parseFloat((projection - invested)?.toFixed(2)),
        year: future.format("DD/MM/YY"),
        type: "Interest",
      });

      projections.push({
        value: parseFloat(invested?.toFixed(2)),
        year: future.format("DD/MM/YY"),
        type: "Invested",
      });

      projections.push({
        value: parseFloat(projection?.toFixed(2)),
        year: future.format("DD/MM/YY"),
        type: "Combined",
      });
    }

    setHoldingProjection(projections);
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
      );
      const currentValue = calculateCurrentAmount(
        record?.principal,
        record?.interestRate,
        record?.compoundFrequency,
        record?.investmentDatetime
      );

      return {
        ...record,
        currentValue,
        maturityAmount,
        institution: record?.institution?.label,
        investmentDate: record?.investmentDatetime,
        compoundFrequency: getCompoundFrequencyType(record?.compoundFrequency),
        remainingInterest: maturityAmount - currentValue,
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

      createNotification("Updated the investment record!", "success");
    } catch (error) {
      createNotification("Failed to update the investment record", "error");
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

      createNotification("Removed the investment record!", "success");
    } catch (error) {
      createNotification("Failed to remove the investment record", "error");
    }

    setRemovingRecordStatus(false);
  };

  const createHolding = async (payload) => {
    try {
      setCreatingRecordStatus(true);
      const database = await getDatabase();
      await database.investments.insert(payload);

      createNotification("Created the investment record successfully", "success");
    } catch (error) {
      createNotification("Failed to create investment record", "error");
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

      createNotification("Replicated the investment record successfully", "success");
    } catch (error) {
      createNotification("Failed to replicate investment record", "error");
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
