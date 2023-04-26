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
    equityTransactions: [],
    fetchingEquityholdings: false,
    creatingEquityholdings: false,
    updatingEquityholdings: false,
    removingEquityholdings: false,
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
    setEquityHoldings(state, payload = []) {
      return { ...state, equityTransactions: payload };
    },
    removeEquityHolding(state, payload = {}) {
      return {
        ...state,
        equityTransactions: [...state.equityTransactions.filter(({ uuid }) => uuid !== payload?.uuid)],
      };
    },
  },
};

export default holdingsModel;
