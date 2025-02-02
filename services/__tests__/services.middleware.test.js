const { isLoggedIn } = require("../middleware");

describe("Test middleware", () => {
  it("Should redirect to login page", () => {
    const req = { isAuthenticated: jest.fn().mockReturnValue(false) };
    const res = { redirect: jest.fn() };
    const next = jest.fn();
    isLoggedIn(req, res, next);
    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/auth/login");
  });

  it("Should redirect to login page", () => {
    const req = { isAuthenticated: jest.fn().mockReturnValue(true) };
    const res = { redirect: jest.fn() };
    const next = jest.fn();
    isLoggedIn(req, res, next);
    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
