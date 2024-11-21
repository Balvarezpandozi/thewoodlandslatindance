const ViewLocals = require("../ViewLocals");

describe('Test ViewLocals helper', () => {
    it ('Should declare all default values', () => {
        const viewLocals = new ViewLocals();
        expect(viewLocals.scheduleLink).toBe('/#schedule-section');
        expect(viewLocals.pricingLink).toBe('/#pricing-section');
        expect(viewLocals.faqsLink).toBe('/#faqs-section');
        expect(viewLocals.contactLink).toBe('#contact-section');
        expect(viewLocals.joinNewsletterLink).toBe('/newsletter');
        expect(viewLocals.pageTitle).toBe('The Woodlands Latin Dance');
    });
});