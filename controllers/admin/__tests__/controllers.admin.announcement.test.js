const adminController = require("../announcement");
const Announcements = require("../../../models/announcement");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Test announcement routes", () => {
  it("renders new announcement form", async () => {
    const req = {};
    const res = {
      render: jest.fn(),
    };
    await adminController.renderNewAnnouncementForm(req, res);
    expect(res.render).toHaveBeenCalledWith("admin/newAnnouncement");
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
      new Date("2025-02-01").toISOString(),
    );
    expect(savedAnnouncement.showUntil.toISOString()).toBe(
      new Date("2025-02-10").toISOString(),
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
      new Date("2025-02-01").toISOString(),
    );
    expect(savedAnnouncement.showUntil.toISOString()).toBe(
      new Date("2025-02-10").toISOString(),
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
