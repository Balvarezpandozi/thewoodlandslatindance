const newsletterController = require('../newsletter');

describe('Test newsletter controller', () => { 
    it('renders form page', async () => {
        const req = {};
        const res = {
            render: jest.fn()
        };
        await newsletterController.renderNewsletterForm(req, res);
        expect(res.render.mock.calls[0][0]).toBe('newsletter/new');
    });
})