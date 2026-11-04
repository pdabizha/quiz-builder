'use client';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Check, Plus, Trash2 } from 'lucide-react';

import type { QuizFormValues } from '@/lib/quiz-schema';

interface QuestionEditorProps {
  index: number;
  onRemove: () => void;
}

export function QuestionEditor({ index, onRemove }: QuestionEditorProps) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<QuizFormValues>();

  const question = useWatch({
    control,
    name: `questions.${index}`,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  const questionError = errors.questions?.[index];

  const changeType = (type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX') => {
    setValue(`questions.${index}.type`, type);
    setValue(`questions.${index}.expectedAnswer`, '');

    if (type === 'BOOLEAN') {
      setValue(`questions.${index}.options`, [
        { text: 'True', isCorrect: true, order: 0 },
        { text: 'False', isCorrect: false, order: 1 },
      ]);
    } else if (type === 'INPUT') {
      setValue(`questions.${index}.options`, []);
    } else {
      setValue(`questions.${index}.options`, [
        { text: '', isCorrect: false, order: 0 },
        { text: '', isCorrect: false, order: 1 },
      ]);
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50 text-sm font-semibold text-violet-700">
            {index + 1}
          </span>

          <h3 className="font-semibold text-gray-900">Question {index + 1}</h3>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
          aria-label={`Remove question ${index + 1}`}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div>
        <label
          htmlFor={`question-${index}`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Question text
        </label>

        <input
          id={`question-${index}`}
          {...register(`questions.${index}.text`)}
          placeholder="Enter your question..."
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />

        {questionError?.text && (
          <p className="mt-1.5 text-xs text-red-600">
            {questionError.text.message}
          </p>
        )}
      </div>

      <div className="mt-6">
        <label className="mb-3 block text-sm font-medium text-gray-700">
          Question type
        </label>

        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'BOOLEAN', label: 'Boolean' },
            { value: 'INPUT', label: 'Input' },
            { value: 'CHECKBOX', label: 'Checkbox' },
          ].map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => changeType(type.value as typeof question.type)}
              className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                question.type === type.value
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {question.type === 'BOOLEAN' && (
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Select the correct answer
          </p>

          <div className="grid grid-cols-2 gap-3">
            {fields.map((field, optionIndex) => (
              <label
                key={field.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                  question.options[optionIndex]?.isCorrect
                    ? 'border-violet-400 bg-violet-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`questions.${index}.booleanAnswer`}
                  checked={!!question.options[optionIndex]?.isCorrect}
                  onChange={() => {
                    fields.forEach((_, i) => {
                      setValue(
                        `questions.${index}.options.${i}.isCorrect`,
                        i === optionIndex,
                      );
                    });
                  }}
                  className="accent-violet-600"
                />

                <span className="text-sm font-medium text-gray-800">
                  {field.text}
                </span>

                {question.options[optionIndex]?.isCorrect && (
                  <Check size={16} className="ml-auto text-violet-600" />
                )}
              </label>
            ))}
          </div>
        </div>
      )}

      {question.type === 'INPUT' && (
        <div className="mt-6">
          <label
            htmlFor={`answer-${index}`}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Expected answer
          </label>

          <input
            id={`answer-${index}`}
            {...register(`questions.${index}.expectedAnswer`)}
            placeholder="Enter the expected answer..."
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />

          {questionError?.expectedAnswer && (
            <p className="mt-1.5 text-xs text-red-600">
              {questionError.expectedAnswer.message}
            </p>
          )}
        </div>
      )}

      {question.type === 'CHECKBOX' && (
        <div className="mt-6">
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700">Answer options</p>
            <p className="mt-1 text-xs text-gray-400">
              Select all correct answers.
            </p>
          </div>

          <div className="space-y-3">
            {fields.map((field, optionIndex) => (
              <div key={field.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!question.options[optionIndex]?.isCorrect}
                  onChange={(event) =>
                    setValue(
                      `questions.${index}.options.${optionIndex}.isCorrect`,
                      event.target.checked,
                    )
                  }
                  aria-label={`Mark option ${optionIndex + 1} as correct`}
                  className="size-4 shrink-0 accent-violet-600"
                />

                <input
                  {...register(
                    `questions.${index}.options.${optionIndex}.text`,
                  )}
                  placeholder={`Option ${optionIndex + 1}`}
                  className="min-w-0 flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <button
                  type="button"
                  onClick={() => remove(optionIndex)}
                  disabled={fields.length <= 2}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Remove option ${optionIndex + 1}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>

          {questionError?.options && (
            <p className="mt-2 text-xs text-red-600">
              {questionError.options.message ||
                'Please check your answer options.'}
            </p>
          )}

          <button
            type="button"
            onClick={() =>
              append({
                text: '',
                isCorrect: false,
                order: fields.length,
              })
            }
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700"
          >
            <Plus size={16} />
            Add option
          </button>
        </div>
      )}
    </section>
  );
}
