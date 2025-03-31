const nodemailer = require("nodemailer");
const SubscribeModel = require("../models/SubscribeModel");

require("dotenv").config();

const sendEmail = async (recipientEmail, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
};

const notifyAllSubscribers = async (subject, text) => {
  try {
    const subscribers = await SubscribeModel.find();

    const emails = subscribers.map((sub) => sub.email);

    const notify = emails.map((email) => sendEmail(email, subject, text));

    await Promise.all(notify);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

module.exports = {
  sendEmail,
  notifyAllSubscribers,
};
