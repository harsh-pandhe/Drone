import type { Metadata } from 'next';
import { Inter, Rajdhani, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';

import PageTransition from '@/components/PageTransition';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rajdhani = Rajdhani({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'ASCEND | Autonomous Aerial Intelligence',
  description:
    'Precision drone surveying & digital twin creation. Turning physical landscapes into actionable data with LiDAR, photogrammetry, and thermal inspection.',
  keywords: [
    'Drone Surveying',
    'LiDAR',
    'Photogrammetry',
    'Digital Twins',
    'Autonomous Drones',
    'Aerial Intelligence',
  ],
  authors: [{ name: 'Harsh Pandhe' }],
  metadataBase: new URL('https://ascend-drone.vercel.app'), // Placeholder URL
  openGraph: {
    title: 'ASCEND | Autonomous Aerial Intelligence',
    description:
      'Precision drone surveying & digital twin creation. Turning physical landscapes into actionable data.',
    url: 'https://ascend-drone.vercel.app',
    siteName: 'ASCEND',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/frames/ezgif-frame-001.webp', // Using first frame as preview
        width: 1200,
        height: 630,
        alt: 'ASCEND Drone Fleet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASCEND | Autonomous Aerial Intelligence',
    description:
      'Precision drone surveying & digital twin creation. Turning physical landscapes into actionable data.',
    images: ['/frames/ezgif-frame-001.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${rajdhani.variable} ${mono.variable}`}
    >
      <body className="bg-slate-950 selection:bg-cyan-500/30 selection:text-cyan-100">
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
