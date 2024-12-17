class ViewLocals {
    constructor(options = {}) {
        this.scheduleLink = options.scheduleLink || '/#schedule-section';
        this.pricingLink = options.pricingLink || '/#pricing-section';
        this.faqsLink = options.faqsLink || '/#faqs-section';
        this.studentResourcesLink = options.studentResourcesLink || '/studentresources';
        this.contactLink = options.contactLink || '#contact-section';
        this.joinNewsletterLink = options.joinNewsletterLink || 'https://member.life/thewoodlandslatindance/register';
        this.pageTitle = options.pageTitle || 'The Woodlands Latin Dance';
        this.styleFiles = options.styleFiles || [];
    }
}

module.exports = ViewLocals;