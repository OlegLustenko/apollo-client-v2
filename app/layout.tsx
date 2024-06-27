import type { Metadata } from 'next';
import { Cairo as FontSans } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from './ApolloWrapper';
import { cn } from 'lib/utils';
import { Toaster } from 'components/ui/toaster';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloWrapper>
        <body
          className={cn('bg-background min-h-screen font-sans antialiased')}
        >
          {children}
          <Toaster />
        </body>
      </ApolloWrapper>
    </html>
  );
}
