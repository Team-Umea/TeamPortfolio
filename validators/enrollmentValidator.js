const Joi = require("joi");

const enrollmentSchema = Joi.object({
  eventID: Joi.string().required().messages({
    "string.base": "Ogiltigt evenemang id",
    "string.empty": "Evenemang id får inte vara tomt",
  }),
  name: Joi.string().required().messages({
    "string.base": "Ogiltigt namn",
    "string.empty": "Namn får inte vara tomt",
    "any.required": "Namn är obligatoriskt",
  }),
  org: Joi.string().required().messages({
    "date.base": "Ogiltigt organisation eller företag",
    "date.empty": "Organisation eller företag får inte vara tomt",
    "any.required": "Organisation eller företag är obligatoriskt",
  }),
});

const validateEnrollment = async (req, res, next) => {
  try {
    await enrollmentSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Valideringsfel",
      errors: error.details.map((err) => err.message),
    });
  }
};

module.exports = {
  validateEnrollment,
};
