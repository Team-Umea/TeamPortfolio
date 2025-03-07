const getMembers = (_, res) => {
  const members = ["Oscar", "Frank", "Andreas", "Sebastian", "Robin", "Tobias", "Elias", "Neriman"];

  res.status(200).json({ members, success: true });
};

module.exports = {
  getMembers,
};
