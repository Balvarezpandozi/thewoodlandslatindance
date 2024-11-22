const nodemailer = require("nodemailer");

class EmailSender {
    constructor() {}

    async sendEmail(recipient, options) {
        const filledTemplate = this.processEmailTemplate(options);

        return await this.transport.sendMail({
            from: "'The Woodlands Latin Dance' <thewoodlandslatindance@gmail.com>", // sender address
            to: recipient, // list of receivers
            subject: filledTemplate.subject, // Subject line
            text: filledTemplate.text,
            html: filledTemplate.html, // html body
        });
    }

    processEmailTemplate(options) {
        switch (options.templateName){
            case 'Welcome':
                return this.welcomeTemplate(options);
            case 'Generic':
                return this.genericTemplate(options);
            default:
                return this.welcomeTemplate(options);
        }
    }

    welcomeTemplate(options) {
        return {
            subject: "Welcome to The Woodlands Latin Dance",
            text: `WELCOME TO THE DANCING WORLD We are thrilled to welcome you, ${options.firstName}, to this family. We hope you learn how to dance, shake the stress away, turn the night around, have so much fun and meet great people.Now that we are connected!! you'll be notified of every single event and class that The Woodlands Latin Dance hosts. Appreciate your support! Don't forget to follow us in our social media below⬇️⬇️ 📲Instagram 🫱🏼‍🫲🏽Facebook Turn🕺🏻, Spin💃🏻, Shine🪩 – Your Salsa Journey Starts Here! ~ The Woodlands Latin Dance +1 (832) 791-3321`,
            html: `<h1 style="font-size: 2rem;background-color: #198754;padding: 0.5rem;border-radius: 10px;font-weight: 700;color: rgb(255,255,255);margin: 0.25rem;text-align: center;">The Woodlands Latin Dance</h1>
                <section style="border: 1px solid rgb(169, 169, 169);margin: 0.25rem;border-radius: 10px;padding: 0.5rem">
                <h3 style="font-weight: 700;padding: 0.5rem;width: 100%;color: rgb(0,0,0);margin: 0;text-align:center">WELCOME TO THE DANCING WORLD</h3>
                <p style="color: white;">We are thrilled to welcome you, ${options.firstName}, to this family. We hope you learn how to dance, shake the stress away, turn the night around, have so much fun and meet great people.</p>
                <p>Now that we are connected!! you'll be notified of every single event and class that The Woodlands Latin Dance hosts. Appreciate your support!</p>
                <p>Don't forget to follow us in our social media below⬇️⬇️</p>
                <a style="color: #198754;" href="https://www.instagram.com/thewoodlandslatindance/">📲Instagram</a>
                <a style="color: #198754;" href="https://www.facebook.com/profile.php?id=61568719342267">🫱🏼‍🫲🏽Facebook</a>
                <p>Turn🕺🏻, Spin💃🏻, Shine🪩 – Your Salsa Journey Starts Here!"</p>
                <p style="color: white;font-weight: bold;font-size: 1.5rem;">~ The Woodlands Latin Dance<br><a style="font-size: 1rem;color: #198754;" href="tel:+18327913321">+1 (832) 791-3321</a></p>
                </section>`, 
        }
    }

    get transport() {
        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER, // generated ethereal user
                pass: process.env.GMAIL_APP_PASSWORD, // generated ethereal password
            }
        })
    }
}

module.exports = EmailSender;