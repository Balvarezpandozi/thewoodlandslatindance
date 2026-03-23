const danceClassController = require("../danceClass");
const Announcements = require("../../../models/announcement");
const DanceClasses = require("../../../models/danceClass");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Test classes routes", () => {
  it("renders new dance class form", async () => {
    const req = {};
    const res = {
      render: jest.fn(),
    };
    await danceClassController.renderNewClassForm(req, res);
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
      order: 1,
      url: "https://member.life/thewoodlandslatindance",
      buttonPrompt: "button prompt",
    };

    const response = { redirect: jest.fn() };
    const request = { body: { danceClass } };
    await danceClassController.createClass(request, response);

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
      url: "https://member.life/thewoodlandslatindance",
      buttonPrompt: "button prompt",
    };

    const response = { redirect: jest.fn() };
    const request = { body: { danceClass } };
    try {
      await danceClassController.createClass(request, response);
    } catch (error) {
      expect(error).toEqual(new Error("Invalid dates"));
    }

    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("should delete a class", async () => {
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
      order: 1,
      url: "https://member.life/thewoodlandslatindance",
      buttonPrompt: "button prompt",
    });

    await danceClass.save();

    // Verify that the announcement was saved in the database
    let savedDanceClass = await DanceClasses.findById(danceClass._id);

    expect(savedDanceClass).not.toBeNull();
    const req = { params: { id: danceClass._id } };
    const res = {
      redirect: jest.fn(),
    };
    await danceClassController.deleteClass(req, res);

    savedDanceClass = await Announcements.findById(danceClass._id);

    expect(savedDanceClass).toBeNull();

    await mongoose.connection.close();
    await mongoServer.stop();
  });
});
