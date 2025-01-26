function dateToUTCString(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const day = date.getDate();

  return `${year}-${month < 9 ? `0${month}` : `${month}`}-${
    day + 1 < 9 ? `0${day + 1}` : `${day + 1}`
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
