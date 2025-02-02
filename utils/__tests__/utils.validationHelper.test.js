const {
  validateUSPhoneNumber,
  validateEmail,
  validateLink,
  validateDanceClassDates,
} = require("../validationHelper");

describe("Test validation helper", () => {
  describe("test phone number validator", () => {
    it("should return false because phone number is too long", () => {
      const phoneNumber = "12345678901";
      expect(validateUSPhoneNumber(phoneNumber)).toBe(false);
    });

    it("should return false not a string", () => {
      const phoneNumber = 1234567890;
      expect(validateUSPhoneNumber(phoneNumber)).toBe(false);
    });

    it("should return false because area code starts with invalid number", () => {
      const testNumber1 = "1234567890";
      expect(validateUSPhoneNumber(testNumber1)).toBe(false);

      const testNumber2 = "0234567890";
      expect(validateUSPhoneNumber(testNumber2)).toBe(false);

      const testNumber3 = "5934567890";
      expect(validateUSPhoneNumber(testNumber3)).toBe(false);
    });

    it("should return false because exchange code is invalid", () => {
      const testNumber1 = "3190537744";
      expect(validateUSPhoneNumber(testNumber1)).toBe(false);

      const testNumber2 = "3191537744";
      expect(validateUSPhoneNumber(testNumber2)).toBe(false);
    });

    it("should return true given valid phone number", () => {
      const testNumber1 = "3198537744";
      expect(validateUSPhoneNumber(testNumber1)).toBe(true);
    });
  });

  describe("Test email validator", () => {
    it("should return false because email is not string", () => {
      const testEmail = 123123;
      expect(validateEmail(testEmail)).toBe(false);
    });

    it("should return false because email is not valid", () => {
      const testEmail = "test@test.t";
      expect(validateEmail(testEmail)).toBe(false);
    });

    it("should return true given valid email", () => {
      const testEmail = "test@test.test";
      expect(validateEmail(testEmail)).toBe(true);
    });
  });

  describe("Test link validator", () => {
    it("should return false bceasue link does not have website.ending", () => {
      const testWebsite = "https://thewoodlandslatindance";
      expect(validateLink(testWebsite)).toBe(false);
    });

    it("should return false since it does not have https:// start", () => {
      const testWebsite = "thewoodlandslatindance.com";
      expect(validateLink(testWebsite)).toBe(false);
    });

    it("should return true given valid website", () => {
      const testWebsite = "https://thewoodlandslatindance.com";
      expect(validateLink(testWebsite)).toBe(true);
    });

    it("should return true given valid website", () => {
      const testWebsite = "https://thewoodlandslatindance.com/valentines";
      expect(validateLink(testWebsite)).toBe(true);
    });
  });

  describe("Test dance class dates validator", () => {
    it("Should return true for valid date", () => {
      const datesTest = "February:8th,15th,22nd;March:1st;";
      expect(validateDanceClassDates(datesTest)).toBe(true);
    });

    it("Should return true for valid date", () => {
      const datesTest = "February:8th;March:1st,15th,22nd;";
      expect(validateDanceClassDates(datesTest)).toBe(true);
    });

    it("Should return false for invalid date", () => {
      const datesTest = "February:8thMarch:1st,15th,22nd;";
      expect(validateDanceClassDates(datesTest)).toBe(false);
    });

    it("Should return false for invalid date", () => {
      const datesTest = "";
      expect(validateDanceClassDates(datesTest)).toBe(false);
    });

    it("Should return true for valid date", () => {
      const datesTest = "February:6th,13th,20th,27th;";
      expect(validateDanceClassDates(datesTest)).toBe(true);
    });
  });
});
