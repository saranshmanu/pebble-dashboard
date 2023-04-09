const calculateCurrentAmount = (principal = 0, interest = 0, frequency = 1, investmentDate = "") => {
  const today = new Date().getTime();
  const date = new Date(investmentDate).getTime();
  const duration = (today - date) / (24 * 60 * 60 * 1000);
  return principal * Math.pow(1 + interest / ((12 / frequency) * 100), ((12 / frequency) * duration) / 365);
};

const calculateFutureAmount = (principal = 0, interest = 0, duration = 0, frequency = 1) => {
  return principal * Math.pow(1 + interest / ((12 / frequency) * 100), ((12 / frequency) * duration) / 365);
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

const formatAmount = (amount = 0) => {
  const formattedAmount = "₹" + formatNumber(parseFloat(amount || 0).toFixed(2));
  return formattedAmount;
};

const formatPercentage = (rate = 0) => {
  return `${(rate || 0)?.toFixed(2)} %`;
};

export { calculateCurrentAmount, calculateFutureAmount, getCompoundFrequencyType, formatAmount, formatPercentage };
