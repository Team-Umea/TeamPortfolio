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

const imagesSchema = Joi.array().items(imageSchema);

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

const validateImages = async (req, res, next) => {
  const hasImages = !req.files;

  if (hasImages) {
    req.images = req.files;
    return next();
  }

  const { error } = imagesSchema.validate(req.files);

  if (error) {
    const message = error.details.map((err) => err.message);
    return res.status(400).json({ message, success: false });
  }

  req.images = req.files;

  next();
};

module.exports = {
  validateImage,
  validateImages,
};
