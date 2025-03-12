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
