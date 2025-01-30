const adminController = require("../admin");
const Announcements = require("../../models/announcement");

describe("Test admin controller", () => {
  it("renders index page", async () => {
    const announcementsMock = jest.spyOn(Announcements, "find");
    announcementsMock.mockImplementation(() => {
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
