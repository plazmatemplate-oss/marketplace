import { apiFetch } from "@/lib/api";
import type { AuthResponse, User } from "@/types/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const registerApi = async (payload: RegisterPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>("/users/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getProfileApi = async (): Promise<User> => {
  return apiFetch<User>("/users/profile");
};
