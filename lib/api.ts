const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data: T;
  count?: number;
  page?: number;
  pages?: number;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = json.message || json.error || `HTTP ${response.status} Error`;
    throw new Error(errorMsg);
  }

  if (json.data !== undefined) {
    if (typeof json.data === "object" && json.data !== null && !Array.isArray(json.data)) {
      return {
        ...json.data,
        message: json.message || json.data.message,
        success: json.success !== undefined ? json.success : true,
      };
    }
    return json.data;
  }

  return json;
}
