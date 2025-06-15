import { LoginUserRequest } from "./../model/user-model";
import { Request, Response, NextFunction } from "express";
import { CreateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerRequest = req.body as CreateUserRequest;
      const response = await UserService.register(registerRequest);
      res.status(201).json({
        message: "Register success",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginRequet = req.body as LoginUserRequest;
      const response = await UserService.login(loginRequet);
      res.status(200).json({
        message: "Login success",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
