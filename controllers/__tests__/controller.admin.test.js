const adminController = require("../admin");
const Announcements = require("../../models/announcement");
const DanceClasses = require("../../models/danceClass");
const Prices = require("../../models/price");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Test admin controller", () => {
  it("renders index page", async () => {
    const announcementsMock = jest.spyOn(Announcements, "find");
    announcementsMock.mockImplementation(() => {
      return {};
    });
    const danceClassesMock = jest.spyOn(DanceClasses, "find");
    danceClassesMock.mockImplementation(() => {
      return {};
    });

    const pricesMock = jest.spyOn(Prices, "find");
    pricesMock.mockImplementation(() => {
      return {};
    });

    const req = {};
    const res = {
      render: jest.fn(),
    };
    await adminController.renderDashboard(req, res);
    expect(res.render.mock.calls[0][0]).toBe("admin/dashboard");
  });

  describe("Test announcement routes", () => {
    it("renders new announcement form", async () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };
      await adminController.renderNewAnnouncementForm(req, res);
      expect(res.render.mock.calls[0][0]).toBe("admin/newAnnouncement");
    });

    it("should create an announcement", async () => {
      await mongoose.disconnect();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);

      const announcement = {
        title: "New Event",
        description: "A new event is happening!",
        link: "https://example.com",
        positive: "yes",
        showFrom: "2025-02-01",
        showUntil: "2025-02-10",
      };

      const response = { redirect: jest.fn() };
      const request = { body: { announcement } };
      await adminController.createAnnouncement(request, response);

      // Verify that the announcement was saved in the database
      const savedAnnouncement = await Announcements.findOne({
        title: "New Event",
      });

      expect(savedAnnouncement).not.toBeNull();
      expect(savedAnnouncement.description).toBe("A new event is happening!");
      expect(savedAnnouncement.link).toBe("https://example.com");
      expect(savedAnnouncement.positive).toBe(true);
      expect(savedAnnouncement.showFrom.toISOString()).toBe(
        new Date("2025-02-01").toISOString()
      );
      expect(savedAnnouncement.showUntil.toISOString()).toBe(
        new Date("2025-02-10").toISOString()
      );

      await mongoose.connection.close();
      await mongoServer.stop();
    });

    it("should create an announcement with positive value false", async () => {
      await mongoose.disconnect();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);

      const announcement = {
        title: "New Event",
        description: "A new event is happening!",
        link: "https://example.com",
        showFrom: "2025-02-01",
        showUntil: "2025-02-10",
      };

      const response = { redirect: jest.fn() };
      const request = { body: { announcement } };
      await adminController.createAnnouncement(request, response);

      // Verify that the announcement was saved in the database
      const savedAnnouncement = await Announcements.findOne({
        title: "New Event",
      });

      expect(savedAnnouncement).not.toBeNull();
      expect(savedAnnouncement.description).toBe("A new event is happening!");
      expect(savedAnnouncement.link).toBe("https://example.com");
      expect(savedAnnouncement.positive).toBe(false);
      expect(savedAnnouncement.showFrom.toISOString()).toBe(
        new Date("2025-02-01").toISOString()
      );
      expect(savedAnnouncement.showUntil.toISOString()).toBe(
        new Date("2025-02-10").toISOString()
      );

      await mongoose.connection.close();
      await mongoServer.stop();
    });

    it("should delete an announcement", async () => {
      await mongoose.disconnect();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);

      const announcement = new Announcements({
        title: "New Event",
        description: "A new event is happening!",
        link: "https://example.com",
        positive: "yes",
        showFrom: "2025-02-01",
        showUntil: "2025-02-10",
      });

      await announcement.save();

      // Verify that the announcement was saved in the database
      let savedAnnouncement = await Announcements.findById(announcement._id);

      expect(savedAnnouncement).not.toBeNull();
      const req = { params: { id: announcement._id } };
      const res = {
        redirect: jest.fn(),
      };
      await adminController.deleteAnnouncement(req, res);

      savedAnnouncement = await Announcements.findById(announcement._id);

      expect(savedAnnouncement).toBeNull();

      await mongoose.connection.close();
      await mongoServer.stop();
    });
  });

  describe("Test classes routes", () => {
    it("renders new dance class form", async () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };
      await adminController.renderNewClassForm(req, res);
      expect(res.render.mock.calls[0][0]).toBe("admin/newClass");
    });

    it("should create a class", async () => {
      await mongoose.disconnect();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);

      const danceClass = {
        title: "Test Class",
        description: "A new class!",
        day: "WeekDay",
        time: "8 PM",
        location: "address",
        dates: "February:8th,15th,22nd;March:1st;",
      };

      const response = { redirect: jest.fn() };
      const request = { body: { danceClass } };
      await adminController.createClass(request, response);

      // Verify that the announcement was saved in the database
      const savedDanceClass = await DanceClasses.findOne({
        title: "Test Class",
      });

      expect(savedDanceClass).not.toBeNull();
      expect(savedDanceClass.description).toBe("A new class!");

      await mongoose.connection.close();
      await mongoServer.stop();
    });

    it("should throw an error when dates are invalid", async () => {
      await mongoose.disconnect();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);

      const danceClass = {
        title: "Test Class",
        description: "A new class!",
        day: "WeekDay",
        time: "8 PM",
        location: "address",
        dates: "February8th15th,22nd;March:1st;",
      };

      const response = { redirect: jest.fn() };
      const request = { body: { danceClass } };
      try {
        await adminController.createClass(request, response);
      } catch (error) {
        expect(error).toEqual(new Error("Invalid dates"));
      }

      await mongoose.connection.close();
      await mongoServer.stop();
    });

    it("should delete an announcement", async () => {
      await mongoose.disconnect();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);

      const danceClass = new DanceClasses({
        title: "Test Class",
        description: "A new class!",
        day: "WeekDay",
        time: "8 PM",
        location: "address",
        dates: [
          { month: "February", dates: "8th,15th,22nd" },
          { month: "March", dates: "1st" },
        ],
      });

      await danceClass.save();

      // Verify that the announcement was saved in the database
      let savedDanceClass = await DanceClasses.findById(danceClass._id);

      expect(savedDanceClass).not.toBeNull();
      const req = { params: { id: danceClass._id } };
      const res = {
        redirect: jest.fn(),
      };
      await adminController.deleteClass(req, res);

      savedDanceClass = await Announcements.findById(danceClass._id);

      expect(savedDanceClass).toBeNull();

      await mongoose.connection.close();
      await mongoServer.stop();
    });
  });

  describe("Test price routes", () => {
    it("renders new price class form", async () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };
      await adminController.renderNewPriceForm(req, res);
      expect(res.render.mock.calls[0][0]).toBe("admin/newPrice");
    });

    it("should create a price", async () => {
      await mongoose.disconnect();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);

      const price = {
        name: "Price name",
        description: "A new price",
        buttonPrompt: "button prompt",
        price: 20,
      };

      const response = { redirect: jest.fn() };
      const request = { body: { price } };
      await adminController.createPrice(request, response);

      // Verify that the announcement was saved in the database
      const savedPrice = await Prices.findOne({
        name: "Price name",
      });

      expect(savedPrice).not.toBeNull();
      expect(savedPrice.description).toBe("A new price");

      await mongoose.connection.close();
      await mongoServer.stop();
    });

    it("should create a price with contact booking true and is disabled true", async () => {
      await mongoose.disconnect();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);

      const price = {
        name: "Price name",
        description: "A new price",
        buttonPrompt: "button prompt",
        price: 20,
        isDisabled: "yes",
        contactBooking: "yes",
      };

      const response = { redirect: jest.fn() };
      const request = { body: { price } };
      await adminController.createPrice(request, response);

      // Verify that the announcement was saved in the database
      const savedPrice = await Prices.findOne({
        name: "Price name",
      });

      expect(savedPrice).not.toBeNull();
      expect(savedPrice.isDisabled).toBe(true);
      expect(savedPrice.contactBooking).toBe(true);

      await mongoose.connection.close();
      await mongoServer.stop();
    });

    it("should delete a price", async () => {
      await mongoose.disconnect();
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);

      const price = new Prices({
        name: "Price name",
        description: "A new price",
        buttonPrompt: "button prompt",
        price: 20,
        isDisabled: false,
        contactBooking: false,
      });

      await price.save();

      // Verify that the announcement was saved in the database
      let savedPrice = await Prices.findById(price._id);

      expect(savedPrice).not.toBeNull();
      const req = { params: { id: price._id } };
      const res = {
        redirect: jest.fn(),
      };
      await adminController.deletePrice(req, res);

      savedPrice = await Prices.findById(price._id);

      expect(savedPrice).toBeNull();

      await mongoose.connection.close();
      await mongoServer.stop();
    });
  });
});
