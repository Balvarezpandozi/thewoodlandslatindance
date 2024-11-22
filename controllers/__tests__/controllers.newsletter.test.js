const newsletterController = require('../newsletter');
const Users = require('../../models/users');
const EmailSender = require('../../utils/EmailSender');

describe('Test newsletter controller', () => { 
    it('renders form page', async () => {
        const req = {};
        const res = {
            render: jest.fn()
        };
        await newsletterController.renderNewsletterForm(req, res);
        expect(res.render.mock.calls[0][0]).toBe('newsletter/new');
    });

    it('saves user in database', async () => {
        const mockUser = jest.spyOn(Users.prototype, 'save');
        mockUser.mockImplementation(() => {});
        const mockMailer = jest.spyOn(EmailSender.prototype, 'sendEmail');
        mockMailer.mockImplementation(() => {});
        const req = {
            body: { user: {name: 'sampleUser' }}
        }
        const res = {
            redirect: jest.fn(),
        }
        await newsletterController.addUserToNewsletter(req, res);
        expect(mockUser).toHaveBeenCalled();
    });
})