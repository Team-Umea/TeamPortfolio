const Joi = require("joi");

const eventQuestionSchema = Joi.object({
  eventID: Joi.string().required().messages({
    "string.base": "Ogiltigt evenemang id",
    "string.empty": "Evenemang id får inte vara tomt",
  }),
  question: Joi.string().min(20).max(400).required().messages({
    "string.base": "Ogiltig fråga",
    "string.empty": "Fältet får inte vara tomt",
    "string.min": "Frågan måste vara minst 20 tecken lång",
    "string.max": "Frågan får vara högst 400 tecken lång",
    "any.required": "Fältet är obligatoriskt",
  }),
});

const validateEventQuestion = async (req, res, next) => {
  try {
    await eventQuestionSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Valideringsfel",
      errors: error.details.map((err) => err.message),
    });
  }
};

module.exports = {
  validateEventQuestion,
};
