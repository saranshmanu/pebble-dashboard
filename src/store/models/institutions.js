const institutionsModel = {
  state: {
    fetchingInstitutions: false,
    creatingInstitutions: false,
    updatingInstitutions: false,
    removingInstitutions: false,
    institutions: [],
  },
  reducers: {
    createInstitution(state, payload = {}) {
      return { ...state, institutions: [payload, ...state.institutions] };
    },
    removeInstitution(state, payload = {}) {
      return { ...state, institutions: [...state.institutions.filter(({ uuid }) => uuid !== payload?.uuid)] };
    },
    updateInstitution(state, payload = {}) {
      const institutions = state.institutions.map((institution) => {
        if (institution?.uuid === payload?.uuid) {
          return { ...institution, ...payload };
        }
        return institution;
      });

      return { ...state, institutions: [...institutions] };
    },
    setInstitutions(state, payload = []) {
      return { ...state, institutions: payload };
    },
    setStatus(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
};

export default institutionsModel;
