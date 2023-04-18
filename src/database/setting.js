const settingTable = {
  title: "settingTable",
  version: 1,
  primaryKey: "uuid",
  type: "object",
  properties: {
    uuid: {
      type: "string",
      maxLength: 100,
    },
    summaryViewSections: {
      type: "object",
      properties: {
        distributionGraph: {
          type: "boolean",
          default: false,
        },
        interestRate: {
          type: "boolean",
          default: false,
        },
        projectionGraph: {
          type: "boolean",
          default: false,
        },
        investmentSummary: {
          type: "boolean",
          default: false,
        },
      },
    },
    investmentProjectionCap: {
      type: "object",
      properties: {
        segregatedBarGraph: {
          type: "number",
          default: 10,
          min: 0,
          max: 100,
          multipleOf: 1,
        },
        lineGraph: {
          type: "number",
          default: 50,
          min: 0,
          max: 100,
          multipleOf: 1,
        },
      },
    },
  },
  required: ["uuid"],
  indexes: ["uuid"],
};

export default settingTable;
