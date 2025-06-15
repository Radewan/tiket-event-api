import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcryptjs from "bcryptjs";

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

    return toUserResponse(user);
  }
}
