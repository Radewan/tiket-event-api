import { User } from "@prisma/client";

export interface UserResponse {
  token?: string;
  user: {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: Date;
    updated_at: Date;
  };
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export function toUserResponse(user: User, token?: string): UserResponse {
  return {
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
}
