import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { v4 } from "uuid";
import store from "../../store";
import { getDatabase } from "..";
import {
  calculateDateDifference,
  calculateFutureAmount,
  calculateCurrentAmount,
  getCompoundFrequencyType,
  createNotification,
  checkIfNull,
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

const getEquityHoldingsSummary = async () => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { fetchingEquitySummary: true } });

    const database = await getDatabase();
    let institutions = await database.institution.find().exec();
    institutions = institutions.map((holding) => {
      return { ...holding._data };
    });

    // Calculates Equity Summary
    const response = [];
    for (const institution of institutions) {
      let transactions = await database.equityInvestments.find({ selector: { institution: institution?.uuid } }).exec();
      transactions = transactions.map((transaction) => {
        return { ...transaction._data };
      });

      let quantity = 0;
      let net = 0;

      for (const transaction of transactions) {
        if (transaction?.buy) {
          quantity += transaction?.quantity;
          net += transaction?.quantity * transaction?.average;
        } else {
          quantity -= transaction?.quantity;
          net -= transaction?.quantity * transaction?.average;
        }
      }

      const current = quantity * institution?.lastTradingValue;
      net = current - net;
      response.push({ ...institution, net, quantity, current });
    }

    dispatch({ type: "holdings/setEquitySummary", payload: response });

    // Calculates Equity Stats
    let current = 0;
    let pnl = 0;
    let topGains = { title: "", value: 0 };
    let topLosses = { title: "", value: 0 };

    for (const instrument of response) {
      const instrumentCurrentValue = checkIfNull(instrument?.current);
      const instrumentPnlValue = checkIfNull(instrument?.net);

      current += instrumentCurrentValue;
      pnl += instrumentPnlValue;

      if (topGains.value <= instrumentPnlValue) {
        topGains = { title: instrument?.label, value: instrumentPnlValue };
      }
      if (topLosses.value >= instrumentPnlValue) {
        topLosses = { title: instrument?.label, value: instrumentPnlValue };
      }
    }

    dispatch({ type: "holdings/setEquityStats", payload: { current, pnl, topGains, topLosses } });

    // Calculate Equity Timeline
    dayjs.extend(isBetween);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);

    let transactions = await database.equityInvestments.find().exec();
    transactions = transactions
      .map((transaction) => {
        return { ...transaction._data, datetime: dayjs(transaction?.datetime) };
      })
      .sort((a, b) => {
        if (a?.datetime.isSame(b?.datetime)) {
          if (a?.buy && !b?.buy) {
            return -1;
          }
          if (!a?.buy && b?.buy) {
            return 1;
          }
        }
        return a?.datetime?.isAfter(b?.datetime) ? 1 : -1;
      });

    if (!transactions.length) {
      return;
    }
    const start = transactions[0]?.datetime.subtract(1, "day");
    const end = dayjs();

    let value = 0;
    const values = [];
    let removed = [];
    const totalDays = end.diff(start, "day") + 1;

    for (let i = 0; i < totalDays; i += 1) {
      const date = start.add(i, "day");

      let count = 0;
      for (const transaction of transactions) {
        const datetime = transaction?.datetime;
        if (date.isSameOrAfter(datetime)) {
          if (transaction?.buy) {
            value += transaction?.quantity * transaction?.average;
            removed.push(transaction);
          } else {
            let quantity = transaction?.quantity;
            let complete = false;
            // eslint-disable-next-line no-loop-func
            removed = removed.map((record) => {
              if (complete || record === null) {
                return record;
              }
              if (record?.institution === transaction?.institution) {
                if (quantity < record?.quantity) {
                  value -= quantity * record?.average;

                  record.quantity -= quantity;
                  quantity = 0;

                  complete = true;
                  return record;
                } else if (quantity === record?.quantity) {
                  value -= record?.quantity * record?.average;

                  quantity = 0;
                  record.quantity = 0;

                  complete = true;
                  return null;
                } else {
                  value -= record?.quantity * record?.average;

                  quantity -= record?.quantity;
                  record.quantity = 0;

                  complete = false;
                  return null;
                }
              }

              return record;
            });
          }
          count += 1;
        }
      }

      values.push({
        date: date.format("DD/MM/YYYY").toString(),
        scales: value,
      });

      for (let i = 0; i < count; i += 1) {
        transactions.shift();
      }
    }

    dispatch({ type: "holdings/setEquityTimeline", payload: values });
  } catch (error) {}

  dispatch({ type: "holdings/setStatus", payload: { fetchingEquitySummary: false } });
};

const createEquityHolding = async (payload) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { creatingEquityholdings: true } });
    const database = await getDatabase();
    await database.equityInvestments.insert(payload);

    getEquityHoldings();
    getEquityHoldingsSummary();
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
    getEquityHoldingsSummary();
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

    getEquityHoldingsSummary();
    dispatch({ type: "holdings/removeEquityHolding", payload: { uuid } });
    createNotification("Removed the equity investment record!", "success");
  } catch (error) {
    createNotification("Failed to remove the equity investment record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { removingEquityholdings: false } });
};

/**
 * Employee Provident Fund Holding
 */

const getEPFStats = async () => {
  try {
    let employeeShare = 0;
    let employerShare = 0;
    let pensionShare = 0;
    let interest = 0;

    const database = await getDatabase();
    let transactions = await database.employeeProvidentFund.find().exec();
    if (!transactions.length) throw new Error("Transaction not found");
    transactions = transactions.map((transaction) => {
      return transaction?._data;
    });

    for (const transaction of transactions) {
      if (transaction?.isInterest) {
        interest += transaction?.employeeShare + transaction?.employerShare + transaction?.pensionShare;
      } else {
        employeeShare += transaction?.employeeShare || 0;
        employerShare += transaction?.employerShare || 0;
        pensionShare += transaction?.pensionShare || 0;
      }
    }

    dispatch({
      type: "holdings/setEPFStats",
      payload: {
        employeeShare,
        employerShare,
        pensionShare,
        interest,
      },
    });
  } catch (error) {
    createNotification("Failed to calculate EPF stats", "error");
  }
};

const getEPFTransactions = async () => {
  dispatch({ type: "holdings/setStatus", payload: { fetchingEPFTransactions: true } });

  const database = await getDatabase();
  let transactions = await database.employeeProvidentFund.find().exec();
  if (!transactions.length) throw new Error("Transaction not found");
  transactions = transactions.map((transaction) => {
    return transaction?._data;
  });

  getEPFStats();
  dispatch({ type: "holdings/setEPFTransactions", payload: transactions });
  dispatch({ type: "holdings/setStatus", payload: { fetchingEPFTransactions: false } });
};

const createEPFTransaction = async (payload) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { creatingEPFTransaction: true } });
    const database = await getDatabase();
    await database.employeeProvidentFund.insert(payload);

    getEPFTransactions();
    createNotification("Created the EPF transaction record successfully", "success");
  } catch (error) {
    createNotification("Failed to create EPF transaction record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { creatingEPFTransaction: false } });
};

const updateEPFTransaction = async (uuid, payload) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { updatingEPFTransaction: true } });
    const database = await getDatabase();
    let transaction = await database.employeeProvidentFund
      .findOne({
        selector: { uuid },
      })
      .exec();
    delete payload.uuid;
    if (!transaction) throw new Error("Transaction not found");
    await transaction.patch({ ...payload });

    getEPFTransactions();
    createNotification("Updated the EPF transaction record!", "success");
  } catch (error) {
    createNotification("Failed to update the EPF transaction record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { updatingEPFTransaction: false } });
};

const deleteEPFTransaction = async (uuid) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { removingEPFTransaction: true } });
    const database = await getDatabase();
    let transaction = await database.employeeProvidentFund
      .findOne({
        selector: { uuid },
      })
      .exec();
    if (!transaction) throw new Error("Transaction not found");
    await transaction.remove();

    getEPFStats();
    dispatch({ type: "holdings/removeEPFTransaction", payload: { uuid } });
    createNotification("Removed the EPF transaction record!", "success");
  } catch (error) {
    createNotification("Failed to remove the EPF transaction record", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { removingEPFTransaction: false } });
};

const replicateEPFTransaction = async (uuid) => {
  try {
    dispatch({ type: "holdings/setStatus", payload: { replicatingEPFTransaction: true } });
    const database = await getDatabase();
    const transaction = await database.employeeProvidentFund
      .findOne({
        selector: { uuid },
      })
      .exec();

    if (!transaction) throw new Error("Transaction not found");

    await database.employeeProvidentFund.insert({
      ...transaction._data,
      uuid: v4(),
    });

    getEPFTransactions();
    createNotification("Replicated the EPF transaction successfully", "success");
  } catch (error) {
    createNotification("Failed to replicate EPF transaction", "error");
  }

  dispatch({ type: "holdings/setStatus", payload: { replicatingEPFTransaction: false } });
};

export {
  getHoldings,
  updateHolding,
  deleteHolding,
  createHolding,
  replicateHolding,
  getEquityHoldings,
  getEquityHoldingsSummary,
  createEquityHolding,
  updateEquityHolding,
  removeEquityHolding,
  getEPFTransactions,
  createEPFTransaction,
  updateEPFTransaction,
  deleteEPFTransaction,
  replicateEPFTransaction,
};
