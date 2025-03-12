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
