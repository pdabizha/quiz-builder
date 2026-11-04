'use client';

import { useState } from 'react';
import { useFieldArray, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft, LoaderCircle, Plus, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { quizSchema, type QuizFormValues } from '@/lib/quiz-schema';
import { quizService } from '@/services/quiz.service';
import { QuestionEditor } from '@/components/questions/question-editor';

const createEmptyQuestion = (order: number) => ({
  text: '',
  type: 'BOOLEAN' as const,
  order,
  expectedAnswer: '',
  options: [
    { text: 'True', isCorrect: true, order: 0 },
    { text: 'False', isCorrect: false, order: 1 },
  ],
});

export function QuizForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      questions: [createEmptyQuestion(0)],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (values: QuizFormValues) => {
    setSubmitError(null);

    try {
      const payload = {
        title: values.title.trim(),
        questions: values.questions.map((question, index) => ({
          text: question.text.trim(),
          type: question.type,
          order: index,
          expectedAnswer:
            question.type === 'INPUT'
              ? question.expectedAnswer.trim()
              : undefined,
          options:
            question.type === 'INPUT'
              ? []
              : question.options.map((option, optionIndex) => ({
                  text: option.text.trim(),
                  isCorrect: option.isCorrect,
                  order: optionIndex,
                })),
        })),
      };

      const createdQuiz = await quizService.create(payload);

      router.push(`/quizzes/${createdQuiz.id}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to create quiz',
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <label
            htmlFor="quiz-title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Quiz title
          </label>

          <input
            id="quiz-title"
            {...register('title')}
            placeholder="e.g. JavaScript Fundamentals"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />

          {errors.title && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.title.message}
            </p>
          )}
        </section>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add and configure your quiz questions.
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {fields.length} {fields.length === 1 ? 'question' : 'questions'}
          </span>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <QuestionEditor
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
        </div>

        {errors.questions?.root && (
          <p className="text-sm text-red-600">
            {errors.questions.root.message}
          </p>
        )}

        <button
          type="button"
          onClick={() => append(createEmptyQuestion(fields.length))}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 px-4 py-4 text-sm font-medium text-violet-700 transition hover:border-violet-400 hover:bg-violet-50"
        >
          <Plus size={18} />
          Add question
        </button>

        {submitError && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{submitError}</p>
          </div>
        )}

        <div className="flex flex-col-reverse justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row">
          <Link
            href="/quizzes"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}
            {isSubmitting ? 'Creating...' : 'Create quiz'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
