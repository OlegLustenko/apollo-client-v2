import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from './ApolloWrapper';
import { cn } from 'lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  post,
}: Readonly<{
  children: React.ReactNode;
  post: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('bg-background min-h-screen font-sans antialiased')}>
        <ApolloWrapper>
          {children}
          {post}
        </ApolloWrapper>
      </body>
    </html>
  );
}