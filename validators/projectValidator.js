const Joi = require("joi");

const projectSchema = Joi.object({
  _id: Joi.string().optional(),
  project: Joi.string().required().messages({
    "string.base": "Ogiltigt projektnamn",
    "string.empty": "Ogiltigt projektnamn",
  }),
  startDate: Joi.date().required().messages({
    "date.base": "Ogiltigt datum",
  }),
  endDate: Joi.date().optional().greater(Joi.ref("startDate")).messages({
    "date.base": "Ogiltigt datum",
    "date.greater": "Slutdatum måste vara efter startdatum",
  }),
  github: Joi.string()
    .uri()
    .pattern(/github\.com/)
    .required()
    .messages({
      "string.uri": "Ogiltig github URL",
      "string.pattern.name": "Ogiltig github URL",
    }),
  description: Joi.string().min(100).max(2000).optional().messages({
    "string.min": "Ange minst 100 tecken",
    "string.max": "Max 2000 tecken tillåtet",
  }),
  colleagues: Joi.array().items(Joi.string()),
  techStack: Joi.array()
    .items(
      Joi.string().min(1).messages({
        "string.base": "Ogiltig teknologi",
        "string.empty": "Teknologin får inte vara tom",
      })
    )
    .min(3)
    .max(10)
    .required()
    .messages({
      "array.min": "Minst 3 teknologier krävs",
      "array.max": "Max 10 teknologier tillåtet",
    }),
})
  .custom((value, helpers) => {
    if (value.startDate && value.endDate) {
      const start = new Date(value.startDate);
      const end = new Date(value.endDate);
      const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
      if (diffInDays < 7) {
        return helpers.error("any.invalid");
      }
    }
    return value;
  }, "End Date Validation")
  .messages({
    "any.invalid": "Slutdatum måste vara minst en vecka efter startdatum",
  });

const validateProject = async (req, res, next) => {
  try {
    await projectSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validationfel",
      errors: error.details.map((err) => err.message),
    });
  }
};

module.exports = {
  validateProject,
};
