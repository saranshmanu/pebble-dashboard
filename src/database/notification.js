const notificationTable = {
  title: "notificationTable",
  version: 0,
  primaryKey: "uuid",
  type: "object",
  properties: {
    uuid: {
      type: "string",
      maxLength: 100,
    },
    notification: {
      type: "string",
      maxLength: 20,
    },
    datetime: {
      type: "string",
      maxLength: 20,
    },
  },
  required: ["uuid", "notification", "datetime"],
  indexes: ["uuid"],
};

export default notificationTable;
