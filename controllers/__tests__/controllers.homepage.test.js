const homepageController = require("../homepage");
const Announcements = require("../../models/announcement");

describe("Test homepage controller", () => {
  it("renders index page", async () => {
    const announcementsMock = jest.spyOn(Announcements, "findOne");
    announcementsMock.mockImplementation(() => {
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
