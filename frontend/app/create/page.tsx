import { QuizForm } from '@/components/quizzes/quiz-form';

export default function CreateQuizPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-violet-600">
          Quiz management
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
          Create a quiz
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Set up your quiz and add questions with different answer types.
        </p>
      </div>

      <QuizForm />
    </div>
  );
}