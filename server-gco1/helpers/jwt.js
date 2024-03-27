const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "gc01ig";

class Tokenjwt {
  static genToken(payload) {
    return jwt.sign(payload, secret);
  }
  static verify(token) {
    return jwt.verify(token, secret);
  }
}

module.exports = Tokenjwt;
