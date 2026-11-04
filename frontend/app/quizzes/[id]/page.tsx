import QuizDetails from '@/components/quizzes/quiz-details';

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params;

  return <QuizDetails id={id} />;
}
