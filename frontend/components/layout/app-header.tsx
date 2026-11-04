import Link from 'next/link';
import { Plus } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white/90 px-5 backdrop-blur-md sm:px-8 lg:px-10">
      <div className="lg:hidden">
        <Link href="/quizzes" className="font-semibold text-gray-900">
          Quiz<span className="text-violet-600">Builder</span>
        </Link>
      </div>

      <div className="hidden text-sm text-gray-500 lg:block">
        Workspace <span className="mx-2 text-gray-300">/</span>
        <span className="font-medium text-gray-900">All quizzes</span>
      </div>

      <Link
        href="/create"
        className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700"
      >
        <Plus size={17} />
        Create quiz
      </Link>
    </header>
  );
}
