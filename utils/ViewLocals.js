class ViewLocals {
    constructor(options = {}) {
        this.scheduleLink = options.scheduleLink || '/#schedule-section';
        this.pricingLink = options.pricingLink || '/#pricing-section';
        this.faqsLink = options.faqsLink || '/#faqs-section';
        this.contactLink = options.contactLink || '#contact-section';
        this.joinNewsletterLink = options.joinNewsletterLink || '/newsletter';
        this.pageTitle = options.pageTitle || 'The Woodlands Latin Dance';
        this.styleFiles = options.styleFiles || [];
    }
}

module.exports = ViewLocals;