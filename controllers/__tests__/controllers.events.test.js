const eventsController = require("../events");
const Event = require("../../models/event");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const EmailSender = require("../../utils/EmailSender");

jest.mock("../../utils/EmailSender");

describe("Test events controller", () => {
  it("renders events page", () => {
    const req = {};
    const res = {
      render: jest.fn(),
    };
    eventsController.renderEventsFunnel(req, res);
    expect(res.render.mock.calls[0][0]).toBe("events/index");
  });

  it("should create a new event", async () => {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    EmailSender.mockImplementation(() => {
      return { sendEmail: jest.fn().mockResolvedValue() };
    });

    const event = {
      timestamp: new Date(),
      type: "Corporate Event",
      extra: "Only need a venue",
      date: new Date(),
      guestCount: "9999",
      fullName: "Customer",
      phone: "2812022058",
      email: "thewoodlandslatindance@gmail.com",
    };

    const response = { json: jest.fn() };
    const request = { body: { event: event } };
    await eventsController.requestQuote(request, response);

    // Verify that the announcement was saved in the database
    const savedEvent = await Event.findOne({
      email: "thewoodlandslatindance@gmail.com",
    });

    expect(savedEvent).not.toBeNull();
    expect(savedEvent.guestCount).toBe("9999");

    await mongoose.connection.close();
    await mongoServer.stop();
  });
});

describe("Test request quote", () => {
  let mongoServer;
  let sendEmailMock;

  beforeEach(async () => {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    sendEmailMock = jest.fn().mockResolvedValue(true);

    EmailSender.mockImplementation(() => ({
      sendEmail: sendEmailMock,
    }));
  });

  afterEach(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    jest.clearAllMocks();
  });

  it("should create event lead and send email", async () => {
    const req = {
      body: {
        event: {
          timestamp: new Date(),
          type: "Corporate Event",
          extra: "Only need a venue",
          date: new Date(),
          guestCount: "9999",
          fullName: "Customer",
          phone: "2812022058",
          email: "mock@gmail.com",
        },
      },
    };

    const res = {
      json: jest.fn(),
    };

    await eventsController.requestQuote(req, res);

    // ✅ Verify DB save
    const savedEvent = await Event.findOne({ email: "mock@gmail.com" });

    expect(savedEvent).not.toBeNull();
    expect(savedEvent.type).toBe("Corporate Event");
    expect(savedEvent.guestCount).toBe("9999");
    expect(savedEvent.fullName).toBe("Customer");

    // ✅ Verify email sent
    expect(sendEmailMock).toHaveBeenCalledWith(
      ["TheWoodlandsLatinDance@gmail.com", "bdap121299@gmail.com"],
      expect.objectContaining({
        templateName: "EventLead",
        event: expect.any(Object),
      }),
    );

    // ✅ Verify response
    expect(res.json).toHaveBeenCalledWith({
      message: "Quote request received successfully",
    });
  });
});
