import { z, ZodType } from "zod";

export class UserValidation {
  static register = z.object({
    name: z.string().min(3).max(255),
    email: z.string().min(1).max(255),
    password: z.string().min(6).max(255),
  });
}
