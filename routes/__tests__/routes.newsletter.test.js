const request = require('supertest');
const app = require('../../app'); // Import your app instance
const newsletterController = require('../../controllers/newsletter');

jest.mock('../../controllers/newsletter'); // Mock the homepage controller

describe('Homepage Route', () => {
    test('should call renderNewsletterForm when GET /Newsletter is accessed', async () => {
        // Mock the renderHomepage implementation
        const mockRenderNewsletterForm = jest.fn((req, res) => res.status(200).send('OK'));
        newsletterController.renderNewsletterForm.mockImplementation(mockRenderNewsletterForm);

        // Send a GET request to the base URL
        const response = await request(app).get('/Newsletter');
        
        // Assert the response
        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');

        // Verify that renderHomepage was called
        expect(mockRenderNewsletterForm).toHaveBeenCalled();
    });
});