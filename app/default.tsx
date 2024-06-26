import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from './ApolloWrapper';
import { cn } from 'lib/utils';
import { Toaster } from 'components/ui/toaster';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Posts with Apollo',
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
          className={cn(
            'bg-background min-h-screen font-sans antialiased',
            fontSans.variable,
          )}
        >
          {children}
          <Toaster />
        </body>
      </ApolloWrapper>
    </html>
  );
}
