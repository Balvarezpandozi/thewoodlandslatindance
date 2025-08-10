const Event = require("../event");

describe("Test Event Model", () => {
  it("should have no errors", () => {
    const testEvent = new Event({
      timestamp: new Date(),
      type: "Corporate Event",
      eventDate: new Date(),
      guestCount: "20",
      extra: "Only need a venue",
      fullName: "Bryan",
      phone: "2812022058",
      email: "q@q.com",
    });
    const error = testEvent.validateSync();
    expect(error).toBe(undefined);
  });

  it("should return error when phone number is invalid", () => {
    const testEvent = new Event({
      timestamp: new Date(),
      type: "Corporate Event",
      eventDate: new Date(),
      guestCount: "20",
      extra: "Only need a venue",
      fullName: "Bryan",
      phone: "2022058",
      email: "q@q.com",
    });
    const error = testEvent.validateSync();
    expect(error.errors["phone"].message).toBe(
      "2022058 is not a valid phone number"
    );
  });

  it("should return error when email is invalid", () => {
    const testEvent = new Event({
      timestamp: new Date(),
      type: "Corporate Event",
      eventDate: new Date(),
      guestCount: "20",
      extra: "Only need a venue",
      fullName: "Bryan",
      phone: "2812022058",
      email: "q@qcom",
    });
    const error = testEvent.validateSync();
    expect(error.errors["email"].message).toBe("q@qcom is not a valid email");
  });
});
