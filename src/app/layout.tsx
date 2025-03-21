import type {Metadata} from 'next';

import {Geist, Geist_Mono} from 'next/font/google';
import {GoogleAnalytics} from '@next/third-parties/google';

import './globals.css';
import {Providers} from './provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sleakops - Prueba técnica',
  description: 'Prueba técnica para Sleakops',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-E8J14R5D3V" />
      </body>
    </html>
  );
}
