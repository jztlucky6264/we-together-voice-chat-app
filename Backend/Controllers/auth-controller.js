const hashService = require("../services/hash-service");
const otpService = require("../services/otp-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

class AuthController {
  async sendOtp(req, res) {
    /* console.log(req.body); */

    const { phone } = req.body;
    const number = "wjehey29884";
    //console.log(phone);
    if (!phone) {
      return res.status(400).json({ message: "Phone field is required!" });
    }

    const otp = await otpService.generateOtp();

    const ttl = 1000 * 60 * 2; // 2 min
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    //send otp
    try {
      //await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "message sending failed" });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    if (!(otp || hash || phone)) {
      return res.status(400).json({ message: "All field are required" });
    }

    const [hashedOtp, expired] = hash.split(".");

    if (Date.now() > expired) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const data = `${phone}.${otp}.${expired}`;

    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user;
    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Db error" });
    }

    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    return res.json({ accessToken, user: userDto });
  }
}

module.exports = new AuthController();
