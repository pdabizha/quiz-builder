import Link from 'next/link';
import { ArrowUpRight, BookOpen, Trash2 } from 'lucide-react';
import type { QuizListItem } from '@/types/quiz';

interface QuizCardProps {
  quiz: QuizListItem;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function QuizCard({
  quiz,
  onDelete,
  isDeleting,
}: QuizCardProps) {
  return (
    <article className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <BookOpen size={21} />
        </div>

        <button
          type="button"
          onClick={() => onDelete(quiz.id)}
          disabled={isDeleting}
          aria-label={`Delete ${quiz.title}`}
          title="Delete quiz"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mt-5">
        <Link
          href={`/quizzes/${quiz.id}`}
          className="flex items-center gap-2 text-lg font-semibold text-gray-900 transition hover:text-violet-700"
        >
          <span className="truncate">{quiz.title}</span>
          <ArrowUpRight
            size={17}
            className="shrink-0 opacity-0 transition group-hover:opacity-100"
          />
        </Link>

        <p className="mt-2 text-sm text-gray-500">
          {quiz.questionCount}{' '}
          {quiz.questionCount === 1 ? 'question' : 'questions'}
        </p>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <Link
          href={`/quizzes/${quiz.id}`}
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          View quiz →
        </Link>
      </div>
    </article>
  );
}