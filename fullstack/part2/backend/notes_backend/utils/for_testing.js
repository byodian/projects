const average = numbers => {
  const reducer = (sum, item) => sum + item;

  return numbers.length === 0
    ? 0
    : numbers.reduce(reducer, 0) / numbers.length;
};

module.exports = {
  average
};