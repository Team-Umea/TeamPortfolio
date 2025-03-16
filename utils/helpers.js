function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isImageUrl(value) {
  return typeof value === "string" && /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/.test(value);
}

async function validateImage(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data);

    await sharp(imageBuffer).toBuffer();
    return true;
  } catch (error) {
    return false;
  }
}

async function hasValidImageUrl(obj) {
  const imagePromises = Object.values(obj).filter(isImageUrl).map(validateImage);

  const results = await Promise.all(imagePromises);

  return results.includes(true);
}

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

module.exports = {
  validateUrl,
  isImageUrl,
  validateImage,
  hasValidImageUrl,
  getCurrentDate,
};
