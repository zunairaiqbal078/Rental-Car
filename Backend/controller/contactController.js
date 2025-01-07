const Contact = require("../models/contact");

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
