import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
  static async register(request: CreateUserRequest) {
    const registerRequest = Validation.validate(
      UserValidation.register,
      request
    );

    const totalUserSameName = await prismaClient.user.count({
      where: {
        name: registerRequest.name,
      },
    });

    if (totalUserSameName != 0) {
      throw new ResponseError(400, "Name already exist");
    }

    const totalUserSameEmail = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserSameEmail != 0) {
      throw new ResponseError(400, "Email already exist");
    }

    registerRequest.password = await bcryptjs.hash(
      registerRequest.password,
      10
    );

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

    const payload = toUserResponse(user);
    const token = jwt.sign(payload.user, jwtSecretKey, { expiresIn: "1w" });

    return toUserResponse(user, token);
  }

  static async login(request: LoginUserRequest) {
    const loginRequest = Validation.validate(UserValidation.login, request);

    const user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Email or password wrong");
    }

    const isPasswordValid = await bcryptjs.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "Email or password wrong");
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

    const payload = toUserResponse(user);
    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1w" });

    return toUserResponse(user, token);
  }
}
