import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginApi, registerApi, getProfileApi, type LoginCredentials, type RegisterPayload } from "@/services/authService";
import type { AuthResponse, User } from "@/types/api";

export const AUTH_KEYS = {
  profile: ["auth", "profile"] as const,
};

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        window.dispatchEvent(new Event("authChange"));
      }
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: registerApi,
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        window.dispatchEvent(new Event("authChange"));
      }
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
    },
  });
}

export function useUserProfile() {
  return useQuery<User, Error>({
    queryKey: AUTH_KEYS.profile,
    queryFn: getProfileApi,
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
  });
}
