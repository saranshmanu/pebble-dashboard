const institutionTable = {
  title: "institutionTable",
  version: 0,
  primaryKey: "uuid",
  type: "object",
  properties: {
    uuid: {
      type: "string",
      maxLength: 100,
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
