function validateUSPhoneNumber(phoneNumber) {
  if (typeof phoneNumber !== "string") return false;

  // Remove spaces, parentheses, dashes, dots
  let digits = phoneNumber.replace(/[^\d]/g, "");

  // Allow optional leading "1" for country code
  if (digits.length === 11 && digits[0] === "1") {
    digits = digits.slice(1);
  }

  // Must now be exactly 10 digits
  if (!/^\d{10}$/.test(digits)) return false;

  const areaCode = digits.slice(0, 3);
  const exchangeCode = digits.slice(3, 6);

  // NANP rules for invalid area code
  if (areaCode[0] === "0" || areaCode[0] === "1" || areaCode[1] === "9") {
    return false;
  }

  // NANP rules for invalid exchange code
  if (exchangeCode[0] === "0" || exchangeCode[0] === "1") {
    return false;
  }

  return true;
}

module.exports.validateUSPhoneNumber = validateUSPhoneNumber;

function validateEmail(email) {
  if (typeof email != "string") return false;
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
    return false;
  return true;
}

module.exports.validateEmail = validateEmail;

function validateLink(url) {
  const urlPattern =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/;
  return urlPattern.test(url);
}

module.exports.validateLink = validateLink;

function validateDanceClassDates(dates) {
  const regex = /^([A-Za-z]+:\d{1,2}(st|nd|rd|th)(,\d{1,2}(st|nd|rd|th))*;)+/;
  return regex.test(dates);
}

module.exports.validateDanceClassDates = validateDanceClassDates;
