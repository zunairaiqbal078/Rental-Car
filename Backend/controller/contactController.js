const Contact = require("../models/contact");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// Function to handle contact form submission
const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    console.log("New contact message:", { name, email, subject, message });

    // Save the contact message to the database
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    const savedContact = await newContact.save();

    console.log("Contact saved to database:", savedContact);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailoptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_ADMIN,
      subject: `New Contact Form Submission: ${subject}`,
      text: ` You have received a new message from the contact form:
  Name: ${name}
  Email: ${email}
  Message:
   ${message}`,
    };
    await transporter.sendMail(mailoptions);
    console.log("Email sent successfully.");

    // Send a success response
    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact to database:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = { submitContactForm };
