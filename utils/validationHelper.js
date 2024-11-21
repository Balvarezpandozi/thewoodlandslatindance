function validateUSPhoneNumber(phoneNumber) {
    if(typeof(phoneNumber) != 'string') return false;
    if(!/^\d{10}$/.test(phoneNumber)) return false;

    const areaCode = phoneNumber.slice(0,3);
    const exchangeCode = phoneNumber.slice(3,6);

    //US rules for invalid area code
    if(areaCode[0] == '0' || areaCode[0] == '1' || areaCode[1] == '9') return false;

    //US rules for invalid exchange code
    if(exchangeCode[0] == '0' || exchangeCode[0] == '1') return false;
 
    return true;
}

module.exports.validateUSPhoneNumber = validateUSPhoneNumber; 

function validateEmail(email) {
    if(typeof(email) != 'string') return false;
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return false;
    return true;
}

module.exports.validateEmail = validateEmail; 