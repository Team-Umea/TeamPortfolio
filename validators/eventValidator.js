const Joi = require("joi");

const eventSchema = Joi.object({
  _id: Joi.string().optional().messages({
    "string.base": "Ogiltigt evenemang id",
    "string.empty": "Evenemang id får inte vara tomt",
  }),
  event: Joi.string().required().messages({
    "string.base": "Ogiltigt evenemangsnamn",
    "string.empty": "Evenemangsnamn får inte vara tomt",
    "any.required": "Evenemangsnamn är obligatoriskt",
  }),
  place: Joi.string().required().messages({
    "string.base": "Ogiltig plats",
    "string.empty": "Plats får inte vara tomt",
    "any.required": "Plats är obligatoriskt",
  }),
  date: Joi.date().iso().required().messages({
    "date.base": "Ogiltigt datum",
    "date.empty": "Datum får inte vara tomt",
    "date.iso": "Datumet måste ha formatet åååå-mm-dd",
    "any.required": "Datum är obligatoriskt",
  }),
  time: Joi.string().optional().messages({
    "string.base": "Ogiltig tid",
    "string.empty": "Tid får inte vara tomt",
  }),
  description: Joi.string().min(100).max(2000).required().messages({
    "string.base": "Ogiltig beskrivning",
    "string.empty": "Beskrivning får inte vara tom",
    "string.min": "Ange minst 100 tecken",
    "string.max": "Max 2000 tecken tillåtet",
    "any.required": "Beskrivning är obligatorisk",
  }),
});

const validateEvent = async (req, res, next) => {
  try {
    const { image, ...eventData } = req.body;

    await eventSchema.validateAsync(eventData);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Valideringsfel",
      errors: error.details.map((err) => err.message),
    });
  }
};

module.exports = {
  validateEvent,
};
