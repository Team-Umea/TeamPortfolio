const Joi = require("joi");
const { validateUrl } = require("../utils/helpers");

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

const validateImage = (req, res, next) => {
  const profileImage = req.body.profileImage;

  const isImageUrl = typeof profileImage === "string";

  if (isImageUrl && validateUrl(profileImage)) {
    return next();
  }

  if (!req.file) {
    return res.status(400).json({ message: "Profilbild krävs", success: false });
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
