const adminController = require("../index");
const Announcements = require("../../../models/announcement");
const DanceClasses = require("../../../models/danceClass");
const Redirections = require("../../../models/redirection");
const Prices = require("../../../models/price");

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
    const redirectionsMock = jest.spyOn(Redirections, "find");
    redirectionsMock.mockImplementation(() => {
      return { populate: jest.fn() };
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
});
