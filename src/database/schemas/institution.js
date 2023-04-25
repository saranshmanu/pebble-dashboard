const institutionTable = {
  title: "institutionTable",
  version: 2,
  primaryKey: "uuid",
  type: "object",
  properties: {
    uuid: {
      type: "string",
      maxLength: 100,
    },
    type: {
      type: "string",
      maxLength: 100,
      default: "Bank",
    },
    lastTradingValue: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 3650,
    },
    label: {
      type: "string",
      maxLength: 20,
    },
  },
  required: ["uuid", "label"],
  indexes: ["uuid"],
};

export default institutionTable;
