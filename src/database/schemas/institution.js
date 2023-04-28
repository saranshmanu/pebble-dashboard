const institutionTable = {
  title: "institutionTable",
  version: 3,
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
    graphIdentifier: {
      type: "string",
      maxLength: 100,
    },
    label: {
      type: "string",
      maxLength: 20,
    },
  },
  required: ["uuid", "label", "type", "lastTradingValue"],
  indexes: ["uuid"],
};

export default institutionTable;
