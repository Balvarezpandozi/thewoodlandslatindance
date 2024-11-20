const request = require('supertest');
const app = require('../../app'); // Import your app instance
const homepageController = require('../../controllers/homepage');

jest.mock('../../controllers/homepage'); // Mock the homepage controller

describe('Homepage Route', () => {
    test('should call renderHomepage when GET / is accessed', async () => {
        // Mock the renderHomepage implementation
        const mockRenderHomepage = jest.fn((req, res) => res.status(200).send('OK'));
        homepageController.renderHomepage.mockImplementation(mockRenderHomepage);

        // Send a GET request to the base URL
        const response = await request(app).get('/');

        // Assert the response
        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');

        // Verify that renderHomepage was called
        expect(mockRenderHomepage).toHaveBeenCalled();
    });
});