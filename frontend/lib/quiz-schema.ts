import { z } from 'zod';

export const quizSchema = z.object({
  title: z.string().trim().min(1, 'Quiz title is required').max(100),
  questions: z
    .array(
      z.object({
        text: z.string().trim().min(1, 'Question text is required'),
        type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
        order: z.number(),
        expectedAnswer: z.string(),
        options: z.array(
          z.object({
            text: z.string().trim(),
            isCorrect: z.boolean(),
            order: z.number(),
          }),
        ),
      }),
    )
    .min(1, 'Add at least one question'),
}).superRefine((data, ctx) => {
  data.questions.forEach((question, index) => {
    if (question.type === 'INPUT' && !question.expectedAnswer.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['questions', index, 'expectedAnswer'],
        message: 'Expected answer is required',
      });
    }

    if (question.type === 'CHECKBOX') {
      if (question.options.length < 2) {
        ctx.addIssue({
          code: 'custom',
          path: ['questions', index, 'options'],
          message: 'Add at least two options',
        });
      }

      if (question.options.some((option) => !option.text.trim())) {
        ctx.addIssue({
          code: 'custom',
          path: ['questions', index, 'options'],
          message: 'All options must have text',
        });
      }

      if (!question.options.some((option) => option.isCorrect)) {
        ctx.addIssue({
          code: 'custom',
          path: ['questions', index, 'options'],
          message: 'Select at least one correct answer',
        });
      }
    }
  });
});

export type QuizFormValues = z.infer<typeof quizSchema>;