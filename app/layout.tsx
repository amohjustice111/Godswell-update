import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Godswell Updates — Gather in faith',
  description: 'Create a video meeting and gather your church, prayer group, or community from anywhere.',
  applicationName: 'Godswell Updates',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Godswell Updates' },
  icons: { icon: '/icon.svg', apple: '/icon.svg' }
};
export const viewport: Viewport = { themeColor: '#102a22', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
