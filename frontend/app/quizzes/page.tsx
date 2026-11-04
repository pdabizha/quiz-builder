import { QuizList } from '@/components/quizzes/quiz-list';

export default function QuizzesPage() {
  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-violet-600">Your workspace</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
            All quizzes
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your quizzes and explore their questions.
          </p>
        </div>
      </div>

      <QuizList />
    </div>
  );
}
