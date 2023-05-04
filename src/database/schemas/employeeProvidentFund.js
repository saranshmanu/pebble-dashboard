const employeeProvidentFundTable = {
  title: "employeeProvidentFundTable",
  version: 1,
  primaryKey: "uuid",
  type: "object",
  properties: {
    uuid: {
      type: "string",
      maxLength: 100,
    },
    employeeShare: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 10000000,
      multipleOf: 0.01,
    },
    employerShare: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 10000000,
      multipleOf: 0.01,
    },
    pensionShare: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 10000000,
      multipleOf: 0.01,
    },
    datetime: {
      type: "string",
      maxLength: 20,
    },
  },
  required: ["uuid", "employeeShare", "employerShare", "pensionShare", "datetime"],
  indexes: ["uuid"],
};

export default employeeProvidentFundTable;
