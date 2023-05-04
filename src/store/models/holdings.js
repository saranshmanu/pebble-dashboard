const holdingsModel = {
  state: {
    // Fixed Income Holdings
    fetchingholdings: false,
    replicatingholdings: false,
    creatingholdings: false,
    updatingholdings: false,
    removingholdings: false,
    distribution: [],
    projection: [],
    holdings: [],
    summary: {
      averageInterestRate: 0,
      accumulatedInterest: 0,
      totalInvestment: 0,
      netAmount: 0,
    },
    // Equity Holdings
    equityStats: {},
    equitySummary: [],
    equityTimeline: [],
    equityTransactions: [],
    fetchingEquitySummary: false,
    fetchingEquityholdings: false,
    creatingEquityholdings: false,
    updatingEquityholdings: false,
    removingEquityholdings: false,
    // Employee Provident Fund Holdings
    epfStats: {},
    epfSummary: {},
    epfTransactions: [],
    fetchingEPFSummary: false,
    fetchingEPFTransactions: false,
    replicatingEPFTransaction: false,
    creatingEPFTransaction: false,
    updatingEPFTransaction: false,
    removingEPFTransaction: false,
  },
  reducers: {
    // Functions related to fixed income holdings
    removeFixedIncomeHolding(state, payload = {}) {
      return { ...state, holdings: [...state.holdings.filter(({ uuid }) => uuid !== payload?.uuid)] };
    },
    setFixedIncomeHoldingSummary(state, payload = {}) {
      return { ...state, summary: payload };
    },
    setFixedIncomeHoldings(state, payload = []) {
      return { ...state, holdings: payload };
    },
    setFixedIncomeHoldingProjection(state, payload = []) {
      return { ...state, projection: payload };
    },
    setFixedIncomeHoldingDistribution(state, payload = []) {
      return { ...state, distribution: payload };
    },
    setStatus(state, payload = {}) {
      return { ...state, ...payload };
    },
    // Functions related to equity holdings
    setEquityStats(state, payload = {}) {
      return { ...state, equityStats: payload };
    },
    setEquitySummary(state, payload = []) {
      return { ...state, equitySummary: payload };
    },
    setEquityHoldings(state, payload = []) {
      return { ...state, equityTransactions: payload };
    },
    setEquityTimeline(state, payload = []) {
      return { ...state, equityTimeline: payload };
    },
    removeEquityHolding(state, payload = {}) {
      return {
        ...state,
        equityTransactions: [...state.equityTransactions.filter(({ uuid }) => uuid !== payload?.uuid)],
      };
    },
    // Functions related to employee provident fund holdings
    setEPFStats(state, payload = {}) {
      return { ...state, epfStats: payload };
    },
    setEPFSummary(state, payload = []) {
      return { ...state, epfSummary: payload };
    },
    setEPFTransactions(state, payload = []) {
      return { ...state, epfTransactions: payload };
    },
    removeEPFTransaction(state, payload = {}) {
      return {
        ...state,
        epfTransactions: [...state.epfTransactions.filter(({ uuid }) => uuid !== payload?.uuid)],
      };
    },
  },
};

export default holdingsModel;
