'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard, Plus } from 'lucide-react';

const navigation = [
  {
    label: 'All quizzes',
    href: '/quizzes',
    icon: LayoutDashboard,
  },
  {
    label: 'Create quiz',
    href: '/create',
    icon: Plus,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
      <Link
        href="/quizzes"
        className="flex h-20 items-center gap-3 border-b border-gray-100 px-7"
      >
        <div className="flex size-9 items-center justify-center rounded-xl bg-violet-600 text-white">
          <BookOpen size={20} />
        </div>

        <span className="text-lg font-semibold tracking-tight text-gray-900">
          Quiz<span className="text-violet-600">Builder</span>
        </span>
      </Link>

      <div className="flex-1 px-4 py-8">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== '/quizzes' && pathname.startsWith(`${href}/`));

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-violet-50 text-violet-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-100 p-5">
        <p className="text-xs text-gray-400">Quiz Builder</p>
        <p className="mt-1 text-sm text-gray-600">Your quiz workspace</p>
      </div>
    </aside>
  );
}
