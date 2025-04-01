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

async function hasValidImageUrl(obj) {
  const imagePromises = Object.values(obj).map(isImageUrl);

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

const processFormData = (projectData) => {
  return Object.keys(projectData).reduce((acc, key) => {
    const value = projectData[key];

    if (Array.isArray(value)) {
      acc[key] = value.map((item) => cleanValue(item));
    } else {
      acc[key] = cleanValue(value);
    }

    return acc;
  }, {});
};

const cleanValue = (value) => {
  const cleanedValue = typeof value === "string" ? value.replace(/^'|'$/g, "") : value;

  if (cleanedValue === "undefined") return undefined;
  if (cleanedValue === "null") return null;

  return cleanedValue;
};

module.exports = {
  validateUrl,
  isImageUrl,
  hasValidImageUrl,
  getCurrentDate,
  processFormData,
};
