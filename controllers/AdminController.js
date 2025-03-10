const createProfile = async (req, res) => {
  try {
    console.log("Profile", req.body);
    res.status(401).json({ message: "Profil har skapats", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server fel", success: false });
  }
};

module.exports = {
  createProfile,
};
