function validateUSPhoneNumber(phoneNumber) {
  if (typeof phoneNumber != "string") return false;
  if (!/^\d{10}$/.test(phoneNumber)) return false;

  const areaCode = phoneNumber.slice(0, 3);
  const exchangeCode = phoneNumber.slice(3, 6);

  //US rules for invalid area code
  if (areaCode[0] == "0" || areaCode[0] == "1" || areaCode[1] == "9")
    return false;

  //US rules for invalid exchange code
  if (exchangeCode[0] == "0" || exchangeCode[0] == "1") return false;

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
