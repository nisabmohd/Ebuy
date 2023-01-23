import { Request } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import Blunder from "../utils/error";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../utils/envalid";
import Token from "../models/token";
import { JWTPayload } from "../middlewares/auth";

interface SignupRequest<T> extends Request {
  body: T;
}
export const signup = asyncHandler(
  async (
    req: SignupRequest<{
      email?: string;
      password: string;
      firstname: string;
      mobile: {
        prefix: string;
        number: string;
      };
    }>,
    res,
    next
  ) => {
    const { email, password, firstname, mobile } = req.body;
    const ifUser = await User.findOne({ mobile });
    if (ifUser) throw new Blunder("User already exist", 409);
    const newUser = new User({
      email,
      password: hashSync(password, 10),
      firstname,
      mobile,
    });
    const user = await newUser.save();
    const access_token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
      expiresIn: "30m",
    });
    const refresh_token = jwt.sign({ id: user._id }, env.JWT_REFRESH_SECRET);
    await new Token({ token: refresh_token }).save();
    res.json({ user, refresh_token, access_token });
  }
);

interface SigninRequest<T> extends Request {
  body: T;
}
export const signin = asyncHandler(
  async (
    req: SigninRequest<{ emailOrPhone: string; password: string }>,
    res,
    next
  ) => {
    const { emailOrPhone, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });
    if (!user) throw new Blunder("User doesn't exist", 400);
    const compare = compareSync(password, user.password);
    if (!compare) throw new Blunder("Password doesn't match", 401);
    const access_token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
      expiresIn: "30m",
    });
    const refresh_token = jwt.sign({ id: user._id }, env.JWT_REFRESH_SECRET);
    await new Token({ token: refresh_token }).save();
    res.send({ user, access_token, refresh_token });
  }
);

interface SignoutRequest<T> extends Request {
  body: T;
}
export const signout = asyncHandler(
  async (req: SignoutRequest<{ refresh_token: string }>, res, next) => {
    const { refresh_token } = req.body;
    const loggedOut = await Token.deleteOne({ token: refresh_token });
    if (!loggedOut.deletedCount)
      throw new Blunder("Something went wrong!", 400);
    res.json({ message: "logged out succesfully" });
  }
);

interface TokenRequest<T> extends Request {
  body: T;
}

export const handleToken = asyncHandler(
  async (req: TokenRequest<{ token: string }>, res, next) => {
    const { token } = req.body;
    const decoded = <JWTPayload>jwt.verify(token, env.JWT_REFRESH_SECRET);
    const access_token = jwt.sign({ id: decoded.id }, env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.json(access_token);
  }
);
