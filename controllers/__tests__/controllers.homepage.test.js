const homepageController = require("../homepage");
const Announcements = require("../../models/announcement");
const DanceClasses = require("../../models/danceClass");

describe("Test homepage controller", () => {
  it("renders index page", async () => {
    const announcementsMock = jest.spyOn(Announcements, "findOne");
    const danceClassesMock = jest.spyOn(DanceClasses, "find");
    announcementsMock.mockImplementation(() => {
      return {};
    });
    danceClassesMock.mockImplementation(() => {
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
