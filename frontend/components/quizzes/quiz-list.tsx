'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, BookOpen, LoaderCircle, Plus } from 'lucide-react';
import Link from 'next/link';

import { quizService } from '@/services/quiz.service';
import type { QuizListItem } from '@/types/quiz';
import { QuizCard } from './quiz-card';

export function QuizList() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizService.getAll();
        setQuizzes(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load quizzes',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this quiz?',
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError(null);

    try {
      await quizService.delete(id);
      setQuizzes((current) => current.filter((quiz) => quiz.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete quiz',
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <LoaderCircle className="animate-spin text-violet-600" size={30} />
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {quizzes.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-5 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <BookOpen size={26} />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-900">
            No quizzes yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Create your first quiz and start building your question collection.
          </p>

          <Link
            href="/create"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            <Plus size={17} />
            Create your first quiz
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onDelete={handleDelete}
              isDeleting={deletingId === quiz.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}