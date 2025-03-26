export function appendToFormData(dataObject) {
  const formData = new FormData();

  const filteredEntries = Object.entries(dataObject).filter(
    ([, value]) => value !== null && value !== undefined
  );

  filteredEntries.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}

export const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const getFutureDateString = (startDate, days) => {
  const date = startDate ? new Date(startDate) : new Date();

  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

export function getRawReadmeUrl(repoUrl, branch = "main") {
  const pattern = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
  const match = repoUrl.match(pattern);

  if (match) {
    const owner = match[1];
    const repoName = match[2];
    const filePath = "README.md";

    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${filePath}`;
    return rawUrl;
  } else {
    throw new Error("Ogiltig github URL");
  }
}
