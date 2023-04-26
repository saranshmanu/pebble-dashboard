const equityInvestmentTable = {
  title: "equityInvestmentTable",
  version: 4,
  primaryKey: "uuid",
  type: "object",
  properties: {
    uuid: {
      type: "string",
      maxLength: 100,
    },
    institution: {
      type: "string",
      ref: "institution",
    },
    buy: {
      type: "boolean",
      default: false,
    },
    datetime: {
      type: "string",
      maxLength: 20,
    },
    quantity: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 1000000,
      multipleOf: 1,
    },
    average: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 1000000,
      multipleOf: 0.01,
    },
  },
  required: ["uuid", "institution", "buy", "datetime", "quantity", "average"],
  indexes: ["uuid"],
};

export default equityInvestmentTable;
