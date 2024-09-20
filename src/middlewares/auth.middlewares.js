import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(payload.id).select("-password -email");
    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    next();
  }
};

export{
    verifyJWT
}
