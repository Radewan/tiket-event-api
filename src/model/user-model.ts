import { User } from "./../generated/prisma/index.d";
export type UserResponse = {
  username: string;
  email: string;
  token?: string;
};

export type CreateUserRequest = {
  username: string;
  email: string;
  password: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    username: user.username,
    email: user.email,
  };
}
