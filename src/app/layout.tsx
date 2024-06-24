import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import Navbar from './components/navbar';
import React from 'react';
import DashboardNav from './components/DashboardNav';
import ErrorBoundary from './components/ErrorBoundry';
const inter = Roboto({ subsets: ['latin'], weight: ['300', '400'] });

export const metadata: Metadata = {
  title: 'Clays Note App',
  description: 'App Created By Mohsin Shafique',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!process.env.BACKEND_ROOT) {
    throw new Error('BACKEND_ROOTS is not defined');
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="flex felx-col space-y-6 mt-10">
              <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                  {/* <Navbar /> */}
                  <DashboardNav />
                </aside>
                <main>{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
