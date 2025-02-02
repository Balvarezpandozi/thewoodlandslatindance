const homepageController = require("../homepage");
const Announcements = require("../../models/announcement");
const DanceClasses = require("../../models/danceClass");
const Prices = require("../../models/price");

describe("Test homepage controller", () => {
  it("renders index page", async () => {
    const announcementsMock = jest.spyOn(Announcements, "findOne");
    const danceClassesMock = jest.spyOn(DanceClasses, "find");
    const pricesMock = jest.spyOn(Prices, "find");
    announcementsMock.mockImplementation(() => {
      return {};
    });
    danceClassesMock.mockImplementation(() => {
      return {};
    });
    pricesMock.mockImplementation(() => {
      return {};
    });

    const req = {};
    const res = {
      render: jest.fn(),
    };
    await homepageController.renderHomepage(req, res);
    expect(res.render.mock.calls[0][0]).toBe("main/index");
  });
});
