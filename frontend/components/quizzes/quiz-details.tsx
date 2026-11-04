"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Check, CircleHelp, LoaderCircle } from "lucide-react";
import Link from "next/link";

import { quizService } from "@/services/quiz.service";
import type { Quiz, QuizQuestion } from "@/types/quiz";

const questionTypeLabels = {
  BOOLEAN: "True / False",
  INPUT: "Text answer",
  CHECKBOX: "Multiple choice",
};

function QuestionDetails({
  question,
  index,
}: {
  question: QuizQuestion;
  index: number;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-gray-500">
          Question {index + 1}
        </span>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          {questionTypeLabels[question.type]}
        </span>
      </div>

      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        {question.text}
      </h2>

      {question.type === "INPUT" ? (
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
            Expected answer
          </p>
          <p className="font-medium text-gray-900">
            {question.expectedAnswer || "No expected answer provided"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center justify-between gap-3 rounded-lg border p-4 ${
                option.isCorrect
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="text-sm text-gray-800">{option.text}</span>

              {option.isCorrect && (
                <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-green-700">
                  <Check size={15} />
                  Correct answer
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function QuizDetails({ id }: { id: string }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await quizService.getById(id);
        setQuiz(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load quiz",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuiz();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <LoaderCircle className="animate-spin text-indigo-600" size={28} />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
          <CircleHelp className="h-8 w-8 text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Quiz not found</h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
          The quiz you`re looking for doesn`t exist or may have been deleted.
        </p>

        <Link
          href="/quizzes"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <ArrowLeft size={16} />
          Back to quizzes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/quizzes"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back to quizzes
      </Link>

      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
          <CircleHelp size={16} />
          Quiz details
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {quiz.title}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {quiz.questions.length}{" "}
          {quiz.questions.length === 1 ? "question" : "questions"}
        </p>
      </div>

      <div className="space-y-5">
        {quiz.questions.map((question, index) => (
          <QuestionDetails
            key={question.id}
            question={question}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
