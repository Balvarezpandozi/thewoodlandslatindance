const homepageController = require('../homepage');

describe('Test homepage controller', () => { 
    it('renders index page', async () => {
        const req = {};
        const res = {
            render: jest.fn()
        };
        await homepageController.renderHomepage(req, res);
        expect(res.render.mock.calls[0][0]).toBe('main/index');
    });
})