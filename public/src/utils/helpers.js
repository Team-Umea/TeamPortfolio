export function appendToFormData(dataObject) {
  const formData = new FormData();

  Object.keys(dataObject).forEach((key) => {
    const value = dataObject[key];
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}

export const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const getFutureDateString = (days) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate.toISOString().split("T")[0];
};

export function convertToRawUrl(blobUrl) {
  const pattern = /https:\/\/github\.com\/(.+)\/blob\/(.+)\/(.+)/;
  const match = blobUrl.match(pattern);

  if (match) {
    const repository = match[1];
    const branch = match[2];
    const filePath = match[3];

    const rawUrl = `https://raw.githubusercontent.com/${repository}/${branch}/${filePath}`;
    return rawUrl;
  } else {
    throw new Error("Invalid GitHub blob URL");
  }
}
