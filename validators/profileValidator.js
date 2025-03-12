const Joi = require("joi");
const swedishPhoneNumberRegex = /^(?:\+46|0)(?:7[0-9]{8}|[1-9][0-9]{7})$/;

const profileSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Ogiltigt namn",
    "string.empty": "Ogiltigt namn",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Ogiltig mejladress",
      "string.email": "Ogiltig mejladress",
      "string.empty": "Ogiltig mejladress",
    }),
  age: Joi.number().positive().integer().required().messages({
    "number.base": "Ålder måste vara ett positivt heltal",
    "number.positive": "Ålder måste vara ett positivt tal",
    "number.integer": "Ålder måste vara ett heltal",
  }),
  phone: Joi.string().pattern(swedishPhoneNumberRegex).required().messages({
    "string.pattern.name": "Ogiltigt telefonnummer",
  }),
  title: Joi.string().required().messages({
    "string.base": "Ogiltig titel",
    "string.empty": "Ogiltig titel",
  }),
  linkedin: Joi.string().uri().required().messages({
    "string.uri": "Ogiltig url",
  }),
  github: Joi.string().uri().required().messages({
    "string.uri": "Ogiltig url",
  }),
  portfolio: Joi.string().uri().optional().messages({
    "string.uri": "Ogiltig url",
  }),
  bio: Joi.string().min(50).max(500).required().messages({
    "string.base": "Ogiltig biografi",
    "string.empty": "Biografi får inte vara tom",
    "string.min": "Ange minst 50 tecken",
    "string.max": "Max 500 tecken tillåtet",
  }),
});

const validateProfile = async (req, res, next) => {
  try {
    const { profileImage, ...profileData } = req.body;

    await profileSchema.validateAsync(profileData);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validationfel",
      errors: error.details.map((err) => err.message),
    });
  }
};

module.exports = {
  validateProfile,
};
