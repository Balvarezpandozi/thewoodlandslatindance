const nodemailer = require("nodemailer");
const EmailSender = require("../../utils/EmailSender");

jest.mock("nodemailer");

describe("EmailSender", () => {
  let sendMailMock;

  beforeEach(() => {
    sendMailMock = jest.fn().mockResolvedValue("mocked result");

    // Mock createTransport to return an object with sendMail
    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send an email with the Welcome template", async () => {
    const emailSender = new EmailSender();

    const options = {
      templateName: "Welcome",
      firstName: "John",
    };

    const result = await emailSender.sendEmail(
      "recipient@example.com",
      options
    );

    // Ensure sendMail was called
    expect(sendMailMock).toHaveBeenCalledTimes(1);

    // Extract what sendMail was called with
    const callArgs = sendMailMock.mock.calls[0][0];
    expect(callArgs.to).toBe("recipient@example.com");
    expect(callArgs.subject).toContain("Welcome to The Woodlands Latin Dance");
    expect(callArgs.html).toContain("John");

    // Ensure we return the mocked result
    expect(result).toBe("mocked result");
  });

  it("should process the EventLead template correctly", async () => {
    const emailSender = new EmailSender();

    const event = {
      type: "Wedding",
      eventDate: new Date("2025-08-10"),
      guestCount: 150,
      fullName: "Jane Doe",
      phone: "555-555-5555",
      email: "jane@example.com",
    };

    await emailSender.sendEmail("me@example.com", {
      templateName: "EventLead",
      event,
    });

    const { subject, html } = sendMailMock.mock.calls[0][0];
    expect(subject).toContain("Jane Doe");
    expect(html).toContain("Wedding");
    expect(html).toContain("150");
  });

  it("should return undefined for unknown template", () => {
    const EmailSender = require("../../utils/EmailSender");
    const sender = new EmailSender();

    const result = sender.processEmailTemplate({
      templateName: "NotARealTemplate",
    });

    expect(result).toBeUndefined();
  });
});
