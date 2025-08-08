// Root layout applies global styles and the default pastel theme
import '../styles/globals.css';
import { pastelTheme } from '../lib/theme';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'StanPi'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: pastelTheme.background, color: pastelTheme.foreground }}>
      <body>{children}</body>
    </html>
  );
}
