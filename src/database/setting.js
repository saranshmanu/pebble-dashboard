const settingTable = {
  title: "settingTable",
  version: 0,
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
  },
  required: ["uuid"],
  indexes: ["uuid"],
};

export default settingTable;
