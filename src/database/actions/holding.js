import dayjs from "dayjs";
import { v4 } from "uuid";
import store from "../../store";
import { getDatabase } from "..";
import {
  calculateDateDifference,
  calculateFutureAmount,
  calculateCurrentAmount,
  getCompoundFrequencyType,
  createNotification,
} from "../../utils/commonFunctions";

const { dispatch } = store;

/**
 * Fixed Income Holdings
 */

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
  dispatch({ type: "holdings/setFixedIncomeHoldingDistribution", payload: data });
};

const refreshHoldingProjection = async () => {
  const database = await getDatabase();
  let holdings = await database.investments.find().exec();
  holdings = holdings.map((holding) => holding._data);

  // Number of years for which projection is to be calculated
  const duration = 100;

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

  dispatch({ type: "holdings/setFixedIncomeHoldingProjection", payload: projections });
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

  dispatch({ type: "holdings/setFixedIncomeHoldingSummary", payload: payload });
};

const getHoldings = async () => {
  dispatch({ type: "holdings/setStatus", payload: { fetchingholdings: true } });

  const database = await getDatabase();
  let holdings = await database.investments.find().exec();

  let response = [];
  for (const holding of holdings) {
    const institution = await holding.populate("institution");
    response.push({ ...holding._data, institution: institution?._data });
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
      institution: record?.institution?.label || "-",
      investmentDate: record?.investmentDatetime,
      compoundFrequency: getCompoundFrequencyType(record?.compoundFrequency),
      remainingInterest: maturityAmount - currentValue,
    };
  });

  dispatch({ type: "holdings/setStatus", payload: { fetchingholdings: false } });
  dispatch({ type: "holdings/setFixedIncomeHoldings", payload: holdings });

  refreshHoldingStats(holdings);
  refreshHoldingProjection();
  refreshHoldingDistribution(holdings);
};

const updateHolding = async (uuid, payload) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { updatingholdings: true } });
    const database = await getDatabase();
    let holding = await database.investments
      .findOne({
        selector: { uuid },
      })
      .exec();
    delete payload.uuid;
    await holding.patch({ ...payload });

    getHoldings();
    createNotification("Updated the investment record!", "success");
  } catch (error) {
    createNotification("Failed to update the investment record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { updatingholdings: false } });
};

const deleteHolding = async (uuid) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { removingholdings: true } });
    const database = await getDatabase();
    let holding = await database.investments
      .findOne({
        selector: { uuid },
      })
      .exec();
    await holding.remove();

    dispatch({ type: "holdings/removeFixedIncomeHolding", payload: { uuid } });
    createNotification("Removed the investment record!", "success");
  } catch (error) {
    createNotification("Failed to remove the investment record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { removingholdings: false } });
};

const createHolding = async (payload) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { creatingholdings: true } });
    const database = await getDatabase();
    await database.investments.insert(payload);

    getHoldings();
    createNotification("Created the investment record successfully", "success");
  } catch (error) {
    createNotification("Failed to create investment record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { creatingholdings: false } });
};

const replicateHolding = async (uuid) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { replicatingholdings: true } });
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

    getHoldings();
    createNotification("Replicated the investment record successfully", "success");
  } catch (error) {
    createNotification("Failed to replicate investment record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { replicatingholdings: false } });
};

/**
 * Equity Holdings
 */

const getEquityHoldings = async () => {
  dispatch({ type: "holdings/setStatus", payload: { fetchingEquityholdings: true } });

  const database = await getDatabase();
  let holdings = await database.equityInvestments.find().exec();

  let response = [];
  for (const holding of holdings) {
    const institution = await holding.populate("institution");
    response.push({ ...holding._data, institution: institution?._data });
  }

  dispatch({ type: "holdings/setStatus", payload: { fetchingEquityholdings: false } });
  dispatch({ type: "holdings/setEquityHoldings", payload: response });
};

const createEquityHolding = async (payload) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { creatingEquityholdings: true } });
    const database = await getDatabase();
    await database.equityInvestments.insert(payload);

    getEquityHoldings();
    createNotification("Created the equity investment record successfully", "success");
  } catch (error) {
    createNotification("Failed to create equity investment record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { creatingEquityholdings: false } });
};

const updateEquityHolding = async (uuid, payload) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { updatingEquityholdings: true } });
    const database = await getDatabase();
    let holding = await database.equityInvestments
      .findOne({
        selector: { uuid },
      })
      .exec();
    delete payload.uuid;
    await holding.patch({ ...payload });

    getEquityHoldings();
    createNotification("Updated the equity investment record!", "success");
  } catch (error) {
    createNotification("Failed to update the equity investment record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { updatingEquityholdings: false } });
};

const removeEquityHolding = async (uuid) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { removingEquityholdings: true } });
    const database = await getDatabase();
    let holding = await database.equityInvestments
      .findOne({
        selector: { uuid },
      })
      .exec();
    await holding.remove();

    dispatch({ type: "holdings/removeEquityHolding", payload: { uuid } });
    createNotification("Removed the equity investment record!", "success");
  } catch (error) {
    createNotification("Failed to remove the equity investment record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { removingEquityholdings: false } });
};

export {
  getHoldings,
  updateHolding,
  deleteHolding,
  createHolding,
  replicateHolding,
  getEquityHoldings,
  createEquityHolding,
  updateEquityHolding,
  removeEquityHolding,
};
