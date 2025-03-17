const ProfileModel = require("../models/ProfileModel");

const ensureNewProfile = async (req, res, next) => {
  const { name, email, phone, linkedin, github, portfolio } = req.body;
  const currentUserId = req.user._id;

  try {
    const duplicateProfile = await ProfileModel.findOne({
      $or: [
        { _id: currentUserId },
        { name },
        { email },
        { phone },
        { linkedin },
        { github },
        { portfolio },
      ],
    });

    if (duplicateProfile) {
      if (duplicateProfile._id.equals(currentUserId)) {
        return res.status(400).json({ message: "Din profil har redan skapats.", success: false });
      }

      if (duplicateProfile.name === name) {
        return res.status(400).json({ message: "Användarnamnet är redan taget.", success: false });
      }
      if (duplicateProfile.email === email) {
        return res.status(400).json({ message: "E-postadressen används redan.", success: false });
      }
      if (duplicateProfile.phone === phone) {
        return res.status(400).json({ message: "Telefonnumret används redan.", success: false });
      }
      if (duplicateProfile.linkedin === linkedin) {
        return res
          .status(400)
          .json({ message: "LinkedIn-profilen används redan.", success: false });
      }
      if (duplicateProfile.github === github) {
        return res.status(400).json({ message: "GitHub-profilen används redan.", success: false });
      }
      if (duplicateProfile.portfolio === portfolio) {
        return res.status(400).json({ message: "Portföjlen används redan.", success: false });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const ensureUniqueProfile = async (req, res, next) => {
  const { name, email, phone, linkedin, github, portfolio } = req.body;
  const currentUserId = req.user._id;

  try {
    const duplicateProfile = await ProfileModel.findOne({
      $and: [
        { _id: { $ne: currentUserId } },
        {
          $or: [{ name }, { email }, { phone }, { linkedin }, { github }, { portfolio }],
        },
      ],
    });

    if (duplicateProfile) {
      if (duplicateProfile.name === name) {
        return res.status(400).json({ message: "Användarnamnet är redan taget.", success: false });
      }
      if (duplicateProfile.email === email) {
        return res.status(400).json({ message: "E-postadressen används redan.", success: false });
      }
      if (duplicateProfile.phone === phone) {
        return res.status(400).json({ message: "Telefonnumret används redan.", success: false });
      }
      if (duplicateProfile.linkedin === linkedin) {
        return res
          .status(400)
          .json({ message: "LinkedIn-profilen används redan.", success: false });
      }
      if (duplicateProfile.github === github) {
        return res.status(400).json({ message: "GitHub-profilen används redan.", success: false });
      }
      if (duplicateProfile.portfolio === portfolio) {
        return res.status(400).json({ message: "Portföjlen används redan.", success: false });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

module.exports = {
  ensureNewProfile,
  ensureUniqueProfile,
};
