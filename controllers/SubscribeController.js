const SubscribeModel = require("../models/SubscribeModel");
const { sendEmail } = require("../services/emailService");

const subscribe = async (req, res) => {
  const user = req.user;

  const _id = user._id.split(" ").reverse().join();

  try {
    const existingSubscription = await SubscribeModel.findById(_id);

    if (existingSubscription) {
      existingSubscription.email = user.email;
      existingSubscription.username = user.name;
      await existingSubscription.save();
      return res.status(200).json({ message: "Du prenumererar redan", success: true });
    }

    const newSubscription = new SubscribeModel({
      email: user.email,
      username: user.name,
      _id: _id,
    });
    await newSubscription.save();

    const emailSubject = "Team Umeå";
    const emailText =
      "Välkommen till Team Umeå. Vi kommer att hålla dig uppdaterad på kommande projekt och evenemang";

    await sendEmail(user.email, emailSubject, emailText);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

module.exports = {
  subscribe,
};
