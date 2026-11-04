import type { CreateQuizPayload, Quiz, QuizListItem } from '@/types/quiz';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  } catch {
    throw new Error('Unable to connect to the server');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const message = Array.isArray(error?.message)
      ? error.message.join(', ')
      : error?.message;

    throw new ApiError(message || 'Something went wrong', response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export const quizService = {
  getAll: () => request<QuizListItem[]>('/quizzes'),

  getById: (id: string) => request<Quiz>(`/quizzes/${id}`),

  create: (data: CreateQuizPayload) =>
    request<Quiz>('/quizzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/quizzes/${id}`, {
      method: 'DELETE',
    }),
};
