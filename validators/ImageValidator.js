const Joi = require("joi");
const { hasValidImageUrl } = require("../utils/helpers");

const imageSchema = Joi.object({
  originalname: Joi.string()
    .pattern(/\.webp$/)
    .required()
    .messages({
      "string.pattern.base": "Bilden måste vara i WebP-format.",
    }),
  mimetype: Joi.string().valid("image/webp").required().messages({
    "any.only": "Bilden måste vara av typen image/webp.",
  }),
}).unknown(true);

const validateImage = async (req, res, next) => {
  const hasImage = await hasValidImageUrl(req.body);

  if (hasImage) {
    return next();
  }

  if (!req.file) {
    return res.status(400).json({ message: "Bild krävs", success: false });
  }

  const { error } = imageSchema.validate(req.file);

  if (error) {
    const message = error.details.map((err) => err.message);
    return res.status(400).json({ message, success: false });
  }

  req.image = req.file;

  next();
};

module.exports = {
  validateImage,
};
