const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { Type, Name, Email, Phone, InsuranceType, Rating, Message } = req.body;

    // Basic validation
    if (!Name || !Email || !Message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Determine content based on submission type
    const isReview = Type === 'Review' || Rating;
    const emailSubject = isReview 
        ? `New ${Rating}-Star Review from ${Name}` 
        : `New Insurance Quote Request from ${Name}`;

    const emailText = isReview
        ? `You have received a new customer review on the Complete Insurance Solution website.\n\n` +
          `Details:\n----------------------------------\n` +
          `Name: ${Name}\nEmail: ${Email}\nRating: ${Rating} out of 5 Stars\n\n` +
          `Review:\n----------------------------------\n${Message}`
        : `You have received a new quote request from the Complete Insurance Solution website.\n\n` +
          `Details:\n----------------------------------\n` +
          `Name: ${Name}\nEmail: ${Email}\nPhone: ${Phone || 'Not provided'}\nInsurance Type: ${InsuranceType || 'Not specified'}\n\n` +
          `Message:\n----------------------------------\n${Message}`;

    try {
        // Create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_API_KEY, // Use App Password if Gmail
            },
        });

        // Setup email data
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: 'sameermogre30@gmail.com', // Receiver address
            subject: emailSubject, // Dynamic Subject line
            text: emailText, // Dynamic Text
        };

        // Send mail
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Email sent successfully!' });

    } catch (error) {
        console.error('Email delivery failed:', error);
        return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
}
