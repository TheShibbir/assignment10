const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userData) => {
  const token = jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "1h" });
  return token;
};

module.exports = generateToken;