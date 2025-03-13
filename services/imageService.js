const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = async (fileBuffer) => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploaded-images", format: "webp" },
        (error, result) => {
          if (error) return reject(new Error("Uppladdning av bild misslyckades: " + error.message));
          resolve({ url: result.secure_url, public_id: result.public_id });
        }
      );

      stream.end(fileBuffer);
    });
  } catch (error) {
    throw new Error("Uppladdning av bild misslyckades: " + error.message);
  }
};

module.exports = {
  uploadImageToCloudinary,
};
