import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(3).max(255),
    email: z.string().email().max(255),
    password: z.string().min(6).max(255),
  });
}
