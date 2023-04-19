const investmentTable = {
  title: "investmentTable",
  version: 3,
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
    investmentDatetime: {
      type: "string",
      maxLength: 20,
    },
    compoundFrequency: {
      type: "number",
      default: 12,
      minimum: 1,
      maximum: 12,
      multipleOf: 1,
    },
    duration: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 3650,
      multipleOf: 1,
    },
    interestRate: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 100,
      multipleOf: 0.01,
    },
    principal: {
      description: "Investment Principal",
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 10000000,
      multipleOf: 0.01,
    },
  },
  required: ["uuid", "institution", "investmentDatetime", "duration", "principal"],
  indexes: ["uuid"],
};

export default investmentTable;
