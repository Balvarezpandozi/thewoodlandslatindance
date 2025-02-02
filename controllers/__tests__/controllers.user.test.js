const { renderLoginForm, loginUser, logout } = require("../user");
const ViewLocals = require("../../utils/ViewLocals");

describe("Test user controller", () => {
  let req, res;

  beforeEach(() => {
    req = {}; // You can customize the `req` object if needed
    res = {
      render: jest.fn(), // Mock the `res.render` method
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  it("should render the login page", async () => {
    await renderLoginForm(req, res);

    expect(res.render).toHaveBeenCalledWith("user/login", {
      locals: expect.any(ViewLocals),
    });
  });

  it("should redirect to admin portal when user is defined", async () => {
    req.user = "defined";
    await renderLoginForm(req, res);

    expect(res.redirect).toHaveBeenCalledWith("/adminportal");
  });

  it("should redirect to admin portal", async () => {
    await loginUser(req, res);

    expect(res.redirect).toHaveBeenCalledWith("/adminportal");
  });

  it('should call req.logout and redirect to "/" on success', async () => {
    req.logout = jest.fn((callback) => callback()); // Mock logout function
    await logout(req, res, next);

    expect(req.logout).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/");
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with an error if req.logout fails", async () => {
    req.logout = jest.fn((callback) => callback());
    const error = new Error("Logout failed");
    req.logout.mockImplementationOnce((callback) => callback(error));

    await logout(req, res, next);

    expect(req.logout).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
    expect(res.redirect).not.toHaveBeenCalled();
  });
});
