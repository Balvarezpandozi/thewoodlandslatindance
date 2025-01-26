const qrCodeController = require("../qrCode");
const QRCodeLead = require("../../models/qrCodeLead");
const Redirection = require("../../models/redirection");

jest.mock("../../models/redirection");
jest.mock("../../models/qrCodeLead");

describe("Test qrCodeLead controller controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { redirectionID: "1234" },
      ip: "192.168.1.1",
      headers: {
        "user-agent": "Mozilla/5.0",
        referer: "http://example.com",
        "accept-language": "en-US",
      },
    };

    res = {
      redirect: jest.fn(),
    };

    Redirection.findOne = jest.fn();
    QRCodeLead.prototype.save = jest.fn();
  });

  it('should redirect to "/" if redirection is not found', async () => {
    Redirection.findOne.mockResolvedValue(null);

    await qrCodeController.saveLeadAndRedirect(req, res);

    expect(Redirection.findOne).toHaveBeenCalledWith({ redirectionID: "1234" });
    expect(res.redirect).toHaveBeenCalledWith("/");
  });

  it("should create a lead and redirect to the redirection URL", async () => {
    const mockRedirection = {
      leads: [],
      urlRedirection: "http://redirect-url.com",
      save: jest.fn(),
    };

    Redirection.findOne.mockResolvedValue(mockRedirection);

    await qrCodeController.saveLeadAndRedirect(req, res);

    expect(Redirection.findOne).toHaveBeenCalledWith({ redirectionID: "1234" });
    expect(QRCodeLead.prototype.save).toHaveBeenCalled();
    expect(mockRedirection.leads.length).toBe(1);
    expect(mockRedirection.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("http://redirect-url.com");
  });
});
