const { dateToUTCString, formatNumber } = require("../formatHelper");

describe("Test format helper utility", () => {
  it("should return a date in UTC format", () => {
    const testDate = new Date("2025-10-22");
    const formatDate = dateToUTCString(testDate);
    expect(formatDate).toBe("2025-10-22T00:00:00.000Z");
  });

  it("should return a date in UTC format with preceeding zeroes for date and day less than 10", () => {
    const testDate = new Date("2025-02-05");
    const formatDate = dateToUTCString(testDate);
    expect(formatDate).toBe("2025-02-05T00:00:00.000Z");
  });

  it("should return a date in UTC format", () => {
    const testNumber = "+11231231234";
    const formattedNumber = formatNumber(testNumber);
    expect(formattedNumber).toBe("+1 (123) 123-1234");
  });
});
