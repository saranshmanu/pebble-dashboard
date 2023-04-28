import dayjs from "dayjs";
import { message } from "antd";
import { createNotification as create } from "../database/actions/notification";

const calculateDateDifference = (start, end) => {
  return dayjs(end).diff(dayjs(start), "day");
};

const calculateCurrentAmount = (principal = 0, interest = 0, frequency = 1, date = "") => {
  const duration = calculateDateDifference(date, new Date());
  return principal * Math.pow(1 + interest / ((12 / frequency) * 100), ((12 / frequency) * duration) / 365.25);
};

const calculateFutureAmount = (principal = 0, interest = 0, duration = 0, frequency = 1) => {
  return principal * Math.pow(1 + interest / ((12 / frequency) * 100), ((12 / frequency) * duration) / 365.25);
};

const getCompoundFrequencyType = (frequency = 1) => {
  const frequencyMap = {
    1: "Monthly",
    4: "Quaterly",
    6: "Semiannually",
    12: "Annually",
  };
  return frequencyMap[frequency] || 12;
};

const formatNumber = (number) => {
  const formattedNumber = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return formattedNumber;
};

const formatAmount = (amount = 0, traditionalFormat = false) => {
  const formattedAmount = (!traditionalFormat ? "₹" : "Rs.") + formatNumber(parseFloat(amount || 0).toFixed(2));
  return formattedAmount;
};

const formatPercentage = (rate = 0) => {
  return `${(rate || 0)?.toFixed(2)} %`;
};

const createNotification = async (notification = "", type = "") => {
  create(notification, type);

  switch (type) {
    case "error":
      message.error(notification);
      break;
    case "success":
      message.success(notification);
      break;
    case "info":
      message.info(notification);
      break;
    default:
      break;
  }
};

const checkIfNull = (value = 0) => {
  return value || 0;
};

export {
  formatNumber,
  calculateDateDifference,
  calculateCurrentAmount,
  calculateFutureAmount,
  getCompoundFrequencyType,
  formatAmount,
  formatPercentage,
  createNotification,
  checkIfNull,
};
