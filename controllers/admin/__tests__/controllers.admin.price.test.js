const priceController = require("../price");
const Prices = require("../../../models/price");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Test price routes", () => {
  it("renders new price class form", async () => {
    const req = {};
    const res = {
      render: jest.fn(),
    };
    await priceController.renderNewPriceForm(req, res);
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
      order: 1,
      url: "https://member.life/thewoodlandslatindance/offer/5218",
    };

    const response = { redirect: jest.fn() };
    const request = { body: { price } };
    await priceController.createPrice(request, response);

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
      order: 1,
      url: "https://member.life/thewoodlandslatindance/offer/5218",
    };

    const response = { redirect: jest.fn() };
    const request = { body: { price } };
    await priceController.createPrice(request, response);

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
      order: 1,
      url: "https://member.life/thewoodlandslatindance/offer/5218",
    });

    await price.save();

    // Verify that the announcement was saved in the database
    let savedPrice = await Prices.findById(price._id);

    expect(savedPrice).not.toBeNull();
    const req = { params: { id: price._id } };
    const res = {
      redirect: jest.fn(),
    };
    await priceController.deletePrice(req, res);

    savedPrice = await Prices.findById(price._id);

    expect(savedPrice).toBeNull();

    await mongoose.connection.close();
    await mongoServer.stop();
  });
});
