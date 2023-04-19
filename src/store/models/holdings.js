const holdingsModel = {
  state: {
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
  },
  reducers: {
    removeHolding(state, payload = {}) {
      return { ...state, holdings: [...state.holdings.filter(({ uuid }) => uuid !== payload?.uuid)] };
    },
    setSummary(state, payload = {}) {
      return { ...state, summary: payload };
    },
    setHoldings(state, payload = []) {
      return { ...state, holdings: payload };
    },
    setProjection(state, payload = []) {
      return { ...state, projection: payload };
    },
    setDistribution(state, payload = []) {
      return { ...state, distribution: payload };
    },
    setStatus(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
};

export default holdingsModel;
