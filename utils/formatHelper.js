function dateToUTCString(date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;

  const day = date.getUTCDate();

  return `${year}-${month < 9 ? `0${month}` : `${month}`}-${
    day < 9 ? `0${day}` : `${day}`
  }T00:00:00.000Z`;
}

module.exports.dateToUTCString = dateToUTCString;

function formatNumber(number) {
  // Extract area code, first three digits, and last four digits
  const areaCode = number.slice(2, 5);
  const firstPart = number.slice(5, 8);
  const secondPart = number.slice(8);

  // Format and return the transformed phone number
  return `+1 (${areaCode}) ${firstPart}-${secondPart}`;
}

module.exports.formatNumber = formatNumber;
