const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Get all contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Get Contacts Error:", error);
        res.status(500).json({ message: "Failed to fetch contacts" });
    }
};

// Create a contact (form submission)
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Name, email, and message are required"
            });
        }

        // Save contact first
        const contact = new Contact({
            name,
            email,
            phone,
            message,
        });

        const savedContact = await contact.save();
        console.log("Contact saved to MongoDB:", savedContact._id);

        // Try sending email notification
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
                connectionTimeout: 10000,
                greetingTimeout: 10000,
                socketTimeout: 15000
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: "New Interior Contact Form Submission",
                text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}
                `,
            });

            console.log("Email sent successfully");

            return res.status(201).json({
                success: true,
                message: "Contact saved and email sent successfully"
            });

        } catch (mailError) {
            console.error("Email sending failed:", mailError);

            // Contact already saved, so still return success
            return res.status(201).json({
                success: true,
                message: "Contact saved successfully, but email notification failed"
            });
        }

    } catch (error) {
        console.error("Create Contact Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit contact form"
        });
    }
};