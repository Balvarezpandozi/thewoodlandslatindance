const { validateUSPhoneNumber, validateEmail } = require('../validationHelper');

describe('Test validation helper', () => {
    it('should return false because phone number is too long', () => {
        const phoneNumber = '12345678901';
        expect(validateUSPhoneNumber(phoneNumber)).toBe(false);
    });

    it('should return false not a string', () => {
        const phoneNumber = 1234567890;
        expect(validateUSPhoneNumber(phoneNumber)).toBe(false);
    });

    it('should return false because area code starts with invalid number', () => {
        const testNumber1 = '1234567890';
        expect(validateUSPhoneNumber(testNumber1)).toBe(false);

        const testNumber2 = '0234567890';
        expect(validateUSPhoneNumber(testNumber2)).toBe(false);

        const testNumber3 = '5934567890';
        expect(validateUSPhoneNumber(testNumber3)).toBe(false);
    });

    it('should return false because exchange code is invalid', () => {
        const testNumber1 = '3190537744';
        expect(validateUSPhoneNumber(testNumber1)).toBe(false);

        const testNumber2 = '3191537744';
        expect(validateUSPhoneNumber(testNumber2)).toBe(false);
    });

    it('should return true given valid phone number', () => {
        const testNumber1 = '3198537744';
        expect(validateUSPhoneNumber(testNumber1)).toBe(true);
    });

    it('should return false because email is not string', () => {
        const testEmail = 123123;
        expect(validateEmail(testEmail)).toBe(false);
    });

    it('should return false because email is not valid', () => {
        const testEmail = 'test@test.t';
        expect(validateEmail(testEmail)).toBe(false);
    });

    it('should return true given valid email', () => {
        const testEmail = 'test@test.test';
        expect(validateEmail(testEmail)).toBe(true);
    });
});