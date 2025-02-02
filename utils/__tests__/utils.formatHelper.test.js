const {
  dateToUTCString,
  formatNumber,
  formatDanceClassDates,
} = require("../formatHelper");

describe("Test format helper utility", () => {
  describe("Test UTC fromatter", () => {
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
  });

  describe("Test number formatter", () => {
    it("should return a date in UTC format", () => {
      const testNumber = "+11231231234";
      const formattedNumber = formatNumber(testNumber);
      expect(formattedNumber).toBe("+1 (123) 123-1234");
    });
  });

  describe("Test dance class dates formatter", () => {
    it("Should return a list of valid objects", () => {
      const input = "January:23rd,17th,18th;February:2nd";
      const expectedOutput = [
        { month: "January", dates: "23rd, 17th, 18th" },
        { month: "February", dates: "2nd" },
      ];
      expect(formatDanceClassDates(input)).toEqual(expectedOutput);
    });

    it("ignores empty entries caused by extra semicolons", () => {
      const input = "June:15th,16th;;July:20th";
      const expectedOutput = [
        { month: "June", dates: "15th, 16th" },
        { month: "July", dates: "20th" },
      ];
      expect(formatDanceClassDates(input)).toEqual(expectedOutput);
    });
  });
});
