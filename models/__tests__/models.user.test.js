const User = require('../user');

describe('Test User Model', () => {
    it('should be invalid if phone number is too short', () => {
        const testUser = new User({
            phoneNumber: '555555',
            firstName: 'testName',
            lastName: 'testLastName',
            email: 'test@email.com'
        });
        const error = testUser.validateSync();
        expect(error.errors['phoneNumber'].message).toBe('Phone number is invalid. It must be a US valid 10 digit phone number.');
    });

    it('should be invalid when email is invalid', () => {
        const testUser = new User({
            phoneNumber: '555555',
            firstName: 'testName',
            lastName: 'testLastName',
            email: 'test@email.1'
        });
        const error = testUser.validateSync();
        expect(error.errors['email'].message).toBe('Email is invalid. It mus have the following format example@example.com');
    });
});