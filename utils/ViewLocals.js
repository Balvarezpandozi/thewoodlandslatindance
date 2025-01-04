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
        this.canonicalTag = options.canonicalTag || undefined;
        this.phoneNumber = process.env.PHONE_NUMBER;
        this.formattedPhoneNumber = formatNumber(process.env.PHONE_NUMBER);
    }
}

function formatNumber(number) {
    // Extract area code, first three digits, and last four digits
    const areaCode = number.slice(2, 5);
    const firstPart = number.slice(5, 8);
    const secondPart = number.slice(8);

    // Format and return the transformed phone number
    return `+1 (${areaCode}) ${firstPart}-${secondPart}`;
}

module.exports = ViewLocals;