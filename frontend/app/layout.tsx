import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/sidebar';
import { AppHeader } from '@/components/layout/app-header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quiz Builder',
  description: 'Create and manage your quizzes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8f9fc] antialiased">
        <Suspense fallback={null}>
          <Sidebar />
        </Suspense>

        <div className="min-h-screen lg:pl-64">
          <Suspense fallback={<div className="h-16" />}>
            <AppHeader />
          </Suspense>

          <main className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
