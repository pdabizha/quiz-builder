import type { CreateQuizPayload, Quiz, QuizListItem } from "@/types/quiz";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Something went wrong");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export const quizService = {
  getAll: () => request<QuizListItem[]>("/quizzes"),

  getById: (id: string) => request<Quiz>(`/quizzes/${id}`),

  create: (data: CreateQuizPayload) =>
    request<Quiz>("/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/quizzes/${id}`, {
      method: "DELETE",
    }),
};
